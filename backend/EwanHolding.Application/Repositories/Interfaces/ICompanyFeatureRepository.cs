using EwanHolding.Domain.Entities;

namespace EwanHolding.Application.Repositories.Interfaces
{
    public interface ICompanyFeatureRepository
    {
        Task<IEnumerable<CompanyFeature>> GetAllAsync();

        Task<CompanyFeature?> GetByIdAsync(int id);

        Task<IEnumerable<CompanyFeature>> GetByCompanyIdAsync(int companyId);

        void Create(CompanyFeature companyFeature);

        void Update(CompanyFeature companyFeature);

        void Delete(CompanyFeature companyFeature);
    }
}