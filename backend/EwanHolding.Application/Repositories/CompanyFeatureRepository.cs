using EwanHolding.Application.Repositories.Interfaces;
using EwanHolding.Domain.Entities;
using EwanHolding.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace EwanHolding.Application.Repositories.Implementation
{
    public class CompanyFeatureRepository : ICompanyFeatureRepository
    {
        private readonly EwanHoldingDbContext _context;

        public CompanyFeatureRepository(EwanHoldingDbContext context)
        {
            _context = context;
        }


        public async Task<IEnumerable<CompanyFeature>> GetAllAsync()
        {
            return await _context.CompanyFeatures
                .Include(x => x.Company)
                .OrderBy(x => x.DisplayOrder)
                .ToListAsync();
        }


        public async Task<CompanyFeature?> GetByIdAsync(int id)
        {
            return await _context.CompanyFeatures
                .Include(x => x.Company)
                .FirstOrDefaultAsync(x => x.Id == id);
        }


        public async Task<IEnumerable<CompanyFeature>> GetByCompanyIdAsync(
            int companyId
        )
        {
            return await _context.CompanyFeatures
                .Where(x => x.CompanyId == companyId)
                .OrderBy(x => x.DisplayOrder)
                .ToListAsync();
        }


        public void Create(CompanyFeature companyFeature)
        {
            _context.CompanyFeatures.Add(companyFeature);
        }


        public void Update(CompanyFeature companyFeature)
        {
            _context.CompanyFeatures.Update(companyFeature);
        }


        public void Delete(CompanyFeature companyFeature)
        {
            _context.CompanyFeatures.Remove(companyFeature);
        }
    }
}