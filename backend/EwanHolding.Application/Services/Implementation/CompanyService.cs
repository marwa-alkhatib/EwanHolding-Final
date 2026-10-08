using EwanHolding.Application.DTOs;
using EwanHolding.Application.Services.Interfaces;
using EwanHolding.Application.UnitOfWork;
using EwanHolding.Domain.Entities;
using EwanHolding.Application.Exceptions;

namespace EwanHolding.Application.Services.Implementation
{
    public class CompanyService : ICompanyService
    {
        private readonly IUnitOfWork _unitOfWork;

        public CompanyService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }


        public async Task<IEnumerable<CompanyResponseDto>> GetAllAsync()
        {
            var companies = await _unitOfWork.Companies.GetAllAsync();

            var companyDtos = companies.Select(company => new CompanyResponseDto
            {
                Id = company.Id,

                // Basic Information
                Name_Ar = company.Name_Ar,
                Name_En = company.Name_En,
                Description_Ar = company.Description_Ar,
                Description_En = company.Description_En,
                WebsiteUrl = company.WebsiteUrl,
                LogoUrl = company.LogoUrl,
                IsActive = company.IsActive,

                // Hero
                HeroTitle_Ar = company.HeroTitle_Ar,
                HeroTitle_En = company.HeroTitle_En,
                HeroDescription_Ar = company.HeroDescription_Ar,
                HeroDescription_En = company.HeroDescription_En,

                // Overview
                OverviewTitle_Ar = company.OverviewTitle_Ar,
                OverviewTitle_En = company.OverviewTitle_En,
                OverviewDescription1_Ar = company.OverviewDescription1_Ar,
                OverviewDescription1_En = company.OverviewDescription1_En,
                OverviewDescription2_Ar = company.OverviewDescription2_Ar,
                OverviewDescription2_En = company.OverviewDescription2_En,

                // Why Choose Us
                WhyChooseUsTitle_Ar = company.WhyChooseUsTitle_Ar,
                WhyChooseUsTitle_En = company.WhyChooseUsTitle_En
            });

            var result = companyDtos.ToList();

            foreach (var dto in result)
            {
                dto.Media =
                    (await _unitOfWork.Media.GetByEntityAsync(
                        dto.Id,
                        EwanHolding.Domain.Enums.MediaEntityType.Company
                    ))
                    .Select(m => new MediaResponseDto
                    {
                        Id = m.Id,
                        Url = m.Url,
                        EntityType = m.EntityType,
                        Type = m.Type,
                        DisplayOrder = m.DisplayOrder
                    })
                    .OrderBy(m => m.DisplayOrder)
                    .ToList();
            }

            return result;
        }


        public async Task<CompanyResponseDto> GetByIdAsync(int id)
        {
            var company = await _unitOfWork.Companies.GetByIdAsync(id);

            if (company == null)
                throw new NotFoundException(
                    $"Company with ID {id} not found."
                );

            var companyDto = new CompanyResponseDto
            {
                Id = company.Id,

                // Basic Information
                Name_Ar = company.Name_Ar,
                Name_En = company.Name_En,
                Description_Ar = company.Description_Ar,
                Description_En = company.Description_En,
                WebsiteUrl = company.WebsiteUrl,
                LogoUrl = company.LogoUrl,
                IsActive = company.IsActive,

                // Hero
                HeroTitle_Ar = company.HeroTitle_Ar,
                HeroTitle_En = company.HeroTitle_En,
                HeroDescription_Ar = company.HeroDescription_Ar,
                HeroDescription_En = company.HeroDescription_En,

                // Overview
                OverviewTitle_Ar = company.OverviewTitle_Ar,
                OverviewTitle_En = company.OverviewTitle_En,
                OverviewDescription1_Ar = company.OverviewDescription1_Ar,
                OverviewDescription1_En = company.OverviewDescription1_En,
                OverviewDescription2_Ar = company.OverviewDescription2_Ar,
                OverviewDescription2_En = company.OverviewDescription2_En,

                // Why Choose Us
                WhyChooseUsTitle_Ar = company.WhyChooseUsTitle_Ar,
                WhyChooseUsTitle_En = company.WhyChooseUsTitle_En
            };

            companyDto.Media =
                (await _unitOfWork.Media.GetByEntityAsync(
                    companyDto.Id,
                    EwanHolding.Domain.Enums.MediaEntityType.Company
                ))
                .Select(m => new MediaResponseDto
                {
                    Id = m.Id,
                    Url = m.Url,
                    EntityType = m.EntityType,
                    Type = m.Type,
                    DisplayOrder = m.DisplayOrder
                })
                .OrderBy(m => m.DisplayOrder)
                .ToList();

            return companyDto;
        }


        public async Task<int> CreateAsync(CreateCompanyDto companyDto)
        {
            var nameExists =
                await _unitOfWork.Companies.GetByNameAsync(companyDto.Name_En)
                ?? await _unitOfWork.Companies.GetByNameAsync(companyDto.Name_Ar);

            if (nameExists != null)
                throw new ConflictException(
                    "Company with this name already exists."
                );

            var newCompany = new Company
            {
                // Basic Information
                Name_Ar = companyDto.Name_Ar,
                Name_En = companyDto.Name_En,
                Description_Ar = companyDto.Description_Ar,
                Description_En = companyDto.Description_En,
                WebsiteUrl = companyDto.WebsiteUrl,
                LogoUrl = companyDto.LogoUrl,
                IsActive = companyDto.IsActive,

                // Hero
                HeroTitle_Ar = companyDto.HeroTitle_Ar,
                HeroTitle_En = companyDto.HeroTitle_En,
                HeroDescription_Ar = companyDto.HeroDescription_Ar,
                HeroDescription_En = companyDto.HeroDescription_En,

                // Overview
                OverviewTitle_Ar = companyDto.OverviewTitle_Ar,
                OverviewTitle_En = companyDto.OverviewTitle_En,
                OverviewDescription1_Ar = companyDto.OverviewDescription1_Ar,
                OverviewDescription1_En = companyDto.OverviewDescription1_En,
                OverviewDescription2_Ar = companyDto.OverviewDescription2_Ar,
                OverviewDescription2_En = companyDto.OverviewDescription2_En,

                // Why Choose Us
                WhyChooseUsTitle_Ar = companyDto.WhyChooseUsTitle_Ar,
                WhyChooseUsTitle_En = companyDto.WhyChooseUsTitle_En
            };

            _unitOfWork.Companies.Create(newCompany);

            await _unitOfWork.SaveChangesAsync();

            return newCompany.Id;
        }


        public async Task UpdateAsync(UpdateCompanyDto companyDto)
        {
            var company =
                await _unitOfWork.Companies.GetByIdAsync(companyDto.Id);

            if (company == null)
                throw new NotFoundException(
                    $"Company with ID {companyDto.Id} not found."
                );

            // Basic Information
            company.Name_Ar = companyDto.Name_Ar;
            company.Name_En = companyDto.Name_En;
            company.Description_Ar = companyDto.Description_Ar;
            company.Description_En = companyDto.Description_En;
            company.WebsiteUrl = companyDto.WebsiteUrl;
            company.LogoUrl = companyDto.LogoUrl;
            company.IsActive = companyDto.IsActive;

            // Hero
            company.HeroTitle_Ar = companyDto.HeroTitle_Ar;
            company.HeroTitle_En = companyDto.HeroTitle_En;
            company.HeroDescription_Ar = companyDto.HeroDescription_Ar;
            company.HeroDescription_En = companyDto.HeroDescription_En;

            // Overview
            company.OverviewTitle_Ar = companyDto.OverviewTitle_Ar;
            company.OverviewTitle_En = companyDto.OverviewTitle_En;
            company.OverviewDescription1_Ar =
                companyDto.OverviewDescription1_Ar;
            company.OverviewDescription1_En =
                companyDto.OverviewDescription1_En;
            company.OverviewDescription2_Ar =
                companyDto.OverviewDescription2_Ar;
            company.OverviewDescription2_En =
                companyDto.OverviewDescription2_En;

            // Why Choose Us
            company.WhyChooseUsTitle_Ar =
                companyDto.WhyChooseUsTitle_Ar;
            company.WhyChooseUsTitle_En =
                companyDto.WhyChooseUsTitle_En;

            company.UpdatedAt = DateTime.Now;

            _unitOfWork.Companies.Update(company);

            await _unitOfWork.SaveChangesAsync();
        }


        public async Task DeleteAsync(int id)
        {
            var company =
                await _unitOfWork.Companies.GetByIdAsync(id);

            if (company == null)
                throw new NotFoundException(
                    $"Company with ID {id} not found."
                );

            _unitOfWork.Companies.Delete(company);

            await _unitOfWork.SaveChangesAsync();
        }
    }
}