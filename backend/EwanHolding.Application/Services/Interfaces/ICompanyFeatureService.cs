using EwanHolding.Application.DTOs;

namespace EwanHolding.Application.Services.Interfaces
{
    public interface ICompanyFeatureService
    {
        Task<IEnumerable<CompanyFeatureResponseDto>> GetAllAsync();

        Task<IEnumerable<CompanyFeatureResponseDto>> GetByCompanyIdAsync(
            int companyId
        );

        Task<CompanyFeatureResponseDto> GetByIdAsync(
            int id
        );

        Task<int> CreateAsync(
            CreateCompanyFeatureDto featureDto
        );

        Task UpdateAsync(
            UpdateCompanyFeatureDto featureDto
        );

        Task DeleteAsync(
            int id
        );
    }
}