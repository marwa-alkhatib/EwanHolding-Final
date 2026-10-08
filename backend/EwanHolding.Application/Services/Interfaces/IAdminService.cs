
using EwanHolding.Application.DTOs;

namespace EwanHolding.Application.Services.Interfaces
{
    public interface IAdminService
    {
        Task<IEnumerable<AdminResponseDto>> GetAllAsync();

        Task<AdminResponseDto> GetByIdAsync(int id);

        Task CreateAsync(CreateAdminDto adminDto);

        Task UpdateAsync(UpdateAdminDto adminDto);

        Task DeleteAsync(int id);

        Task<AdminResponseDto> LoginAsync(LoginDto loginDto);

        Task ChangePasswordAsync(int id, ChangePasswordDto dto);

        Task<bool> NeedsPasswordChangeAsync(int id);

        Task SendEmailVerificationAsync(
            int id,
            SendEmailVerificationDto dto);

        Task VerifyEmailCodeAsync(
            int id,
            VerifyEmailCodeDto dto);

        Task<bool> NeedsEmailSetupAsync(int id);
    }
}
