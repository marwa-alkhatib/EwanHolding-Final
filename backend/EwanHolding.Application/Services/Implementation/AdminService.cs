
using System.Security.Claims;
using System.Net;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Globalization;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using EwanHolding.Application.Services.Interfaces;
using EwanHolding.Application.UnitOfWork;
using EwanHolding.Domain.Entities;
using EwanHolding.Application.Exceptions;
using EwanHolding.Application.DTOs;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;

namespace EwanHolding.Application.Services.Implementation
{
    public class AdminService : IAdminService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IConfiguration _configuration;

        public AdminService(
            IUnitOfWork unitOfWork,
            IConfiguration configuration)
        {
            _unitOfWork = unitOfWork;
            _configuration = configuration;
        }

        private static AdminResponseDto ToResponse(Admin admin)
        {
            return new AdminResponseDto
            {
                Id = admin.Id,
                FullName = admin.FullName,
                Email = admin.Email,
                IsActive = admin.IsActive,
                Role = admin.Role,
                LastLoginAt = admin.LastLoginAt,
                IsEmailSetupCompleted = admin.IsEmailSetupCompleted,
                MustChangePassword = admin.MustChangePassword
            };
        }

        public async Task<IEnumerable<AdminResponseDto>> GetAllAsync()
        {
            var admins = await _unitOfWork.Admins.GetAllAsync();
            return admins.Select(ToResponse);
        }

        public async Task<AdminResponseDto> GetByIdAsync(int id)
        {
            var admin = await _unitOfWork.Admins.GetByIdAsync(id);

            if (admin == null)
                throw new NotFoundException(
                    $"Admin with ID {id} not found.");

            return ToResponse(admin);
        }

        public async Task CreateAsync(CreateAdminDto dto)
        {
            var email = dto.Email?.Trim().ToLowerInvariant();

            if (string.IsNullOrWhiteSpace(email))
                throw new BadRequestException("Email is required.");

            if (string.IsNullOrWhiteSpace(dto.Password)
                || dto.Password.Length < 12)
                throw new BadRequestException(
                    "Password must contain at least 12 characters.");

            var existing =
                await _unitOfWork.Admins.GetByEmailAsync(email);

            if (existing != null)
                throw new ConflictException(
                    "Admin email already exists.");

            var admin = new Admin
            {
                FullName = dto.FullName,
                Email = email,
                IsActive = true,
                Role = dto.Role,
                IsEmailSetupCompleted = false,
                MustChangePassword = true
            };

            admin.PasswordHash = new PasswordHasher<Admin>()
                .HashPassword(admin, dto.Password);

            _unitOfWork.Admins.Create(admin);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task UpdateAsync(UpdateAdminDto dto)
        {
            var admin =
                await _unitOfWork.Admins.GetByIdAsync(dto.Id);

            if (admin == null)
                throw new NotFoundException(
                    $"Admin with ID {dto.Id} not found.");

            admin.FullName = dto.FullName;
            admin.Email = dto.Email;
            admin.IsActive = dto.IsActive;
            admin.Role = dto.Role;
            admin.UpdatedAt = DateTime.UtcNow;

            _unitOfWork.Admins.Update(admin);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var admin =
                await _unitOfWork.Admins.GetByIdAsync(id);

            if (admin == null)
                throw new NotFoundException(
                    $"Admin with ID {id} not found.");

            _unitOfWork.Admins.Delete(admin);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<AdminResponseDto> LoginAsync(LoginDto dto)
        {
            var admin =
                await _unitOfWork.Admins.GetByEmailAsync(dto.Email);

            if (admin == null || !admin.IsActive)
                throw new UnauthorizedAppException(
                    "Invalid credentials.");

            var result = new PasswordHasher<Admin>()
                .VerifyHashedPassword(
                    admin,
                    admin.PasswordHash,
                    dto.Password);

            if (result == PasswordVerificationResult.Failed)
                throw new UnauthorizedAppException(
                    "Invalid credentials.");

            admin.LastLoginAt = DateTime.UtcNow;

            _unitOfWork.Admins.Update(admin);
            await _unitOfWork.SaveChangesAsync();

            var response = ToResponse(admin);
            response.Token = CreateToken(admin);

            return response;
        }

        public async Task ChangePasswordAsync(
            int id,
            ChangePasswordDto dto)
        {
            var admin =
                await _unitOfWork.Admins.GetByIdAsync(id);

            if (admin == null || !admin.IsActive)
                throw new UnauthorizedAppException(
                    "Admin account is unavailable.");

            if (string.IsNullOrWhiteSpace(dto.OldPassword)
                || string.IsNullOrWhiteSpace(dto.NewPassword))
                throw new BadRequestException(
                    "Both passwords are required.");

            if (dto.NewPassword.Length < 12)
                throw new BadRequestException(
                    "New password must contain at least 12 characters.");

            var hasher = new PasswordHasher<Admin>();

            var result = hasher.VerifyHashedPassword(
                admin,
                admin.PasswordHash,
                dto.OldPassword);

            if (result == PasswordVerificationResult.Failed)
                throw new BadRequestException(
                    "Old password incorrect.");

            if (dto.OldPassword == dto.NewPassword)
                throw new BadRequestException(
                    "New password cannot be the same as the old password.");

            admin.PasswordHash =
                hasher.HashPassword(admin, dto.NewPassword);

            admin.MustChangePassword = false;
            admin.UpdatedAt = DateTime.UtcNow;

            _unitOfWork.Admins.Update(admin);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<bool> NeedsPasswordChangeAsync(int id)
        {
            var admin =
                await _unitOfWork.Admins.GetByIdAsync(id);

            if (admin == null || !admin.IsActive)
                throw new UnauthorizedAppException(
                    "Admin account is unavailable.");

            return admin.MustChangePassword;
        }

        public async Task<bool> NeedsEmailSetupAsync(int id)
        {
            var admin =
                await _unitOfWork.Admins.GetByIdAsync(id);

            if (admin == null || !admin.IsActive)
                throw new UnauthorizedAppException(
                    "Admin account is unavailable.");

            return !admin.IsEmailSetupCompleted;
        }

        public async Task SendEmailVerificationAsync(
            int id,
            SendEmailVerificationDto dto)
        {
            var admin =
                await _unitOfWork.Admins.GetByIdAsync(id);

            if (admin == null || !admin.IsActive)
                throw new UnauthorizedAppException(
                    "Admin account is unavailable.");

            if (admin.IsEmailSetupCompleted)
                throw new BadRequestException(
                    "Email setup is already completed.");

            var email = dto.NewEmail?.Trim().ToLowerInvariant();

            if (string.IsNullOrWhiteSpace(email)
                || email.Length > 200
                || !MailAddress.TryCreate(email, out var parsed)
                || parsed.Address != email)
                throw new BadRequestException(
                    "Invalid email address.");

            var existing =
                await _unitOfWork.Admins.GetByEmailAsync(email);

            if (existing != null && existing.Id != id)
                throw new ConflictException(
                    "Email is already in use.");

            var now = DateTime.UtcNow;

            if (admin.EmailVerificationCodeSentAt.HasValue
                && now - admin.EmailVerificationCodeSentAt.Value
                    < TimeSpan.FromMinutes(1))
                throw new BadRequestException(
                    "Please wait one minute before requesting another code.");

            var code = RandomNumberGenerator
                .GetInt32(0, 1000000)
                .ToString("D6", CultureInfo.InvariantCulture);

            var smtpHost = _configuration["Email:SmtpHost"];
            var smtpPort = int.Parse(
                _configuration["Email:SmtpPort"] ?? "587");
            var smtpUser = _configuration["Email:Username"];
            var smtpPassword = _configuration["Email:Password"];
            var fromAddress = _configuration["Email:FromAddress"];

            if (string.IsNullOrWhiteSpace(smtpHost)
                || string.IsNullOrWhiteSpace(smtpUser)
                || string.IsNullOrWhiteSpace(smtpPassword)
                || string.IsNullOrWhiteSpace(fromAddress))
                throw new InvalidOperationException(
                    "Email service is not configured.");

            using var message = new MailMessage(
                fromAddress,
                email,
                "Ewan Holding - Verify Your Email",
                $"Your verification code is: {code}\n" +
                "This code expires in 10 minutes.");

            using var smtp = new SmtpClient(smtpHost, smtpPort)
            {
                Credentials = new NetworkCredential(
                    smtpUser, smtpPassword),
                EnableSsl = true
            };

            await smtp.SendMailAsync(message);

            admin.PendingEmail = email;
            admin.EmailVerificationCodeHash =
                HashVerificationCode(id, email, code);
            admin.EmailVerificationCodeExpiresAt =
                now.AddMinutes(10);
            admin.EmailVerificationCodeSentAt = now;
            admin.EmailVerificationAttempts = 0;

            _unitOfWork.Admins.Update(admin);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task VerifyEmailCodeAsync(
            int id,
            VerifyEmailCodeDto dto)
        {
            var admin =
                await _unitOfWork.Admins.GetByIdAsync(id);

            if (admin == null || !admin.IsActive)
                throw new UnauthorizedAppException(
                    "Admin account is unavailable.");

            if (admin.IsEmailSetupCompleted)
                throw new BadRequestException(
                    "Email setup is already completed.");

            if (string.IsNullOrWhiteSpace(admin.PendingEmail)
                || string.IsNullOrWhiteSpace(
                    admin.EmailVerificationCodeHash)
                || admin.EmailVerificationCodeExpiresAt == null)
                throw new BadRequestException(
                    "Please request a verification code first.");

            if (DateTime.UtcNow >
                admin.EmailVerificationCodeExpiresAt.Value)
                throw new BadRequestException(
                    "Verification code has expired.");

            if (admin.EmailVerificationAttempts >= 5)
                throw new BadRequestException(
                    "Too many attempts. Request a new code.");

            var code = dto.Code?.Trim() ?? "";

            var expected = admin.EmailVerificationCodeHash;
            var actual = HashVerificationCode(
                id, admin.PendingEmail, code);

            var valid = code.Length == 6
                && code.All(char.IsAsciiDigit)
                && CryptographicOperations.FixedTimeEquals(
                    Convert.FromHexString(expected),
                    Convert.FromHexString(actual));

            if (!valid)
            {
                admin.EmailVerificationAttempts++;

                _unitOfWork.Admins.Update(admin);
                await _unitOfWork.SaveChangesAsync();

                throw new BadRequestException(
                    "Invalid verification code.");
            }

            var existing =
                await _unitOfWork.Admins.GetByEmailAsync(
                    admin.PendingEmail);

            if (existing != null && existing.Id != id)
                throw new ConflictException(
                    "Email is already in use.");

            admin.Email = admin.PendingEmail;
            admin.IsEmailSetupCompleted = true;

            admin.PendingEmail = null;
            admin.EmailVerificationCodeHash = null;
            admin.EmailVerificationCodeExpiresAt = null;
            admin.EmailVerificationCodeSentAt = null;
            admin.EmailVerificationAttempts = 0;
            admin.UpdatedAt = DateTime.UtcNow;

            _unitOfWork.Admins.Update(admin);
            await _unitOfWork.SaveChangesAsync();
        }

        private string HashVerificationCode(
            int adminId,
            string email,
            string code)
        {
            var secret =
                _configuration["Email:VerificationSecret"];

            if (string.IsNullOrWhiteSpace(secret)
                || secret.Length < 32)
                throw new InvalidOperationException(
                    "Email verification secret is not configured.");

            var data = $"{adminId}:{email}:{code}";

            return Convert.ToHexString(
                HMACSHA256.HashData(
                    Encoding.UTF8.GetBytes(secret),
                    Encoding.UTF8.GetBytes(data)));
        }

        private string CreateToken(Admin admin)
        {
            var claims = new List<Claim>
            {
                new Claim(
                    ClaimTypes.NameIdentifier,
                    admin.Id.ToString()),
                new Claim(
                    ClaimTypes.Name,
                    admin.FullName),
                new Claim(
                    ClaimTypes.Email,
                    admin.Email),
                new Claim(
                    ClaimTypes.Role,
                    admin.Role.ToString())
            };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(
                    _configuration.GetValue<string>(
                        "AppSettings:Token")!));

            var credentials = new SigningCredentials(
                key,
                SecurityAlgorithms.HmacSha512);

            var token = new JwtSecurityToken(
                issuer: _configuration.GetValue<string>(
                    "AppSettings:Issuer"),
                audience: _configuration.GetValue<string>(
                    "AppSettings:Audience"),
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler()
                .WriteToken(token);
        }
    }
}
