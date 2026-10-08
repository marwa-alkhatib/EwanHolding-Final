using EwanHolding.Application.DTOs;
using EwanHolding.Application.Services.Interfaces;
using EwanHolding.Application.UnitOfWork;
using EwanHolding.Domain.Entities;

namespace EwanHolding.Application.Services.Implementation
{
    public class CompanyFeatureService : ICompanyFeatureService
    {
        private readonly IUnitOfWork _unitOfWork;

        public CompanyFeatureService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }


        // ==========================================
        // GET ALL
        // ==========================================

        public async Task<IEnumerable<CompanyFeatureResponseDto>> GetAllAsync()
        {
            var features =
                await _unitOfWork.CompanyFeatures.GetAllAsync();

            return features.Select(feature =>
                new CompanyFeatureResponseDto
                {
                    Id = feature.Id,

                    Title_Ar = feature.Title_Ar,
                    Title_En = feature.Title_En,

                    Description_Ar = feature.Description_Ar,
                    Description_En = feature.Description_En,

                    DisplayOrder = feature.DisplayOrder,

                    CompanyId = feature.CompanyId,

                    CompanyName_Ar =
                        feature.Company?.Name_Ar ?? "",

                    CompanyName_En =
                        feature.Company?.Name_En ?? ""
                }
            );
        }


        // ==========================================
        // GET BY COMPANY ID
        // ==========================================

        public async Task<IEnumerable<CompanyFeatureResponseDto>>
            GetByCompanyIdAsync(int companyId)
        {
            var features =
                await _unitOfWork.CompanyFeatures
                    .GetByCompanyIdAsync(companyId);

            return features.Select(feature =>
                new CompanyFeatureResponseDto
                {
                    Id = feature.Id,

                    Title_Ar = feature.Title_Ar,
                    Title_En = feature.Title_En,

                    Description_Ar = feature.Description_Ar,
                    Description_En = feature.Description_En,

                    DisplayOrder = feature.DisplayOrder,

                    CompanyId = feature.CompanyId,

                    CompanyName_Ar =
                        feature.Company?.Name_Ar ?? "",

                    CompanyName_En =
                        feature.Company?.Name_En ?? ""
                }
            );
        }


        // ==========================================
        // GET BY ID
        // ==========================================

        public async Task<CompanyFeatureResponseDto> GetByIdAsync(int id)
        {
            var feature =
                await _unitOfWork.CompanyFeatures.GetByIdAsync(id);

            if (feature == null)
            {
                throw new Exception(
                    "Company feature not found."
                );
            }

            return new CompanyFeatureResponseDto
            {
                Id = feature.Id,

                Title_Ar = feature.Title_Ar,
                Title_En = feature.Title_En,

                Description_Ar = feature.Description_Ar,
                Description_En = feature.Description_En,

                DisplayOrder = feature.DisplayOrder,

                CompanyId = feature.CompanyId,

                CompanyName_Ar =
                    feature.Company?.Name_Ar ?? "",

                CompanyName_En =
                    feature.Company?.Name_En ?? ""
            };
        }


        // ==========================================
        // CREATE
        // ==========================================

        public async Task<int> CreateAsync(
            CreateCompanyFeatureDto featureDto
        )
        {
            var company =
                await _unitOfWork.Companies
                    .GetByIdAsync(featureDto.CompanyId);

            if (company == null)
            {
                throw new Exception(
                    "Company not found."
                );
            }


            var feature = new CompanyFeature
            {
                Title_Ar =
                    featureDto.Title_Ar,

                Title_En =
                    featureDto.Title_En,

                Description_Ar =
                    featureDto.Description_Ar,

                Description_En =
                    featureDto.Description_En,

                DisplayOrder =
                    featureDto.DisplayOrder,

                CompanyId =
                    featureDto.CompanyId
            };


            _unitOfWork.CompanyFeatures.Create(feature);

            await _unitOfWork.SaveChangesAsync();

            return feature.Id;
        }


        // ==========================================
        // UPDATE
        // ==========================================

        public async Task UpdateAsync(
            UpdateCompanyFeatureDto featureDto
        )
        {
            var feature =
                await _unitOfWork.CompanyFeatures
                    .GetByIdAsync(featureDto.Id);

            if (feature == null)
            {
                throw new Exception(
                    "Company feature not found."
                );
            }


            var company =
                await _unitOfWork.Companies
                    .GetByIdAsync(featureDto.CompanyId);

            if (company == null)
            {
                throw new Exception(
                    "Company not found."
                );
            }


            feature.Title_Ar =
                featureDto.Title_Ar;

            feature.Title_En =
                featureDto.Title_En;

            feature.Description_Ar =
                featureDto.Description_Ar;

            feature.Description_En =
                featureDto.Description_En;

            feature.DisplayOrder =
                featureDto.DisplayOrder;

            feature.CompanyId =
                featureDto.CompanyId;


            _unitOfWork.CompanyFeatures.Update(feature);

            await _unitOfWork.SaveChangesAsync();
        }


        // ==========================================
        // DELETE
        // ==========================================

        public async Task DeleteAsync(int id)
        {
            var feature =
                await _unitOfWork.CompanyFeatures
                    .GetByIdAsync(id);

            if (feature == null)
            {
                throw new Exception(
                    "Company feature not found."
                );
            }


            _unitOfWork.CompanyFeatures.Delete(feature);

            await _unitOfWork.SaveChangesAsync();
        }
    }
}