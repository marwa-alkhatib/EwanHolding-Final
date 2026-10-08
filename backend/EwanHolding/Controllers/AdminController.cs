
using EwanHolding.Application.DTOs;
using EwanHolding.Application.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EwanHolding.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _adminService;

        public AdminController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        private int? CurrentAdminId()
        {
            return int.TryParse(
                User.FindFirst(ClaimTypes.NameIdentifier)?.Value,
                out var id)
                ? id
                : null;
        }

        [HttpGet]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _adminService.GetAllAsync());
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> GetById(int id)
        {
            if (id <= 0)
                return BadRequest("Invalid admin id.");

            return Ok(await _adminService.GetByIdAsync(id));
        }

        [HttpPost]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> Create(
            [FromBody] CreateAdminDto dto)
        {
            await _adminService.CreateAsync(dto);
            return Ok();
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> Update(
            int id,
            [FromBody] UpdateAdminDto dto)
        {
            if (id != dto.Id)
                return BadRequest("Id mismatch.");

            await _adminService.UpdateAsync(dto);
            return Ok();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> Delete(int id)
        {
            await _adminService.DeleteAsync(id);
            return Ok();
        }

        [HttpPut("change-password")]
        [Authorize]
        public async Task<IActionResult> ChangePassword(
            [FromBody] ChangePasswordDto dto)
        {
            var id = CurrentAdminId();

            if (id is null)
                return Unauthorized();

            await _adminService.ChangePasswordAsync(
                id.Value, dto);

            return Ok(new
            {
                message = "Password changed successfully."
            });
        }

        [HttpGet("email-setup-status")]
        [Authorize]
        public async Task<IActionResult> EmailSetupStatus()
        {
            var id = CurrentAdminId();

            if (id is null)
                return Unauthorized();

            return Ok(new
            {
                isEmailSetupRequired =
                    await _adminService.NeedsEmailSetupAsync(id.Value)
            });
        }

        [HttpGet("password-change-status")]
        [Authorize]
        public async Task<IActionResult> PasswordChangeStatus()
        {
            var id = CurrentAdminId();

            if (id is null)
                return Unauthorized();

            return Ok(new
            {
                mustChangePassword =
                    await _adminService.NeedsPasswordChangeAsync(id.Value)
            });
        }

        [HttpPost("send-email-verification")]
        [Authorize]
        public async Task<IActionResult> SendEmailVerification(
            [FromBody] SendEmailVerificationDto dto)
        {
            var id = CurrentAdminId();

            if (id is null)
                return Unauthorized();

            await _adminService.SendEmailVerificationAsync(
                id.Value, dto);

            return Ok(new
            {
                message = "Verification code sent successfully."
            });
        }

        [HttpPost("verify-email-code")]
        [Authorize]
        public async Task<IActionResult> VerifyEmailCode(
            [FromBody] VerifyEmailCodeDto dto)
        {
            var id = CurrentAdminId();

            if (id is null)
                return Unauthorized();

            await _adminService.VerifyEmailCodeAsync(
                id.Value, dto);

            return Ok(new
            {
                message = "Email verified successfully."
            });
        }
    }
}
