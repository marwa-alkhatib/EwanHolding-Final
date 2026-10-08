using EwanHolding.Application.DTOs;
using EwanHolding.Application.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EwanHolding.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyFeatureController : ControllerBase
    {
        private readonly ICompanyFeatureService _companyFeatureService;

        public CompanyFeatureController(
            ICompanyFeatureService companyFeatureService
        )
        {
            _companyFeatureService = companyFeatureService;
        }


        // GET: api/CompanyFeature
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var features =
                await _companyFeatureService.GetAllAsync();

            return Ok(features);
        }


        // GET: api/CompanyFeature/company/2
        [HttpGet("company/{companyId}")]
        public async Task<IActionResult> GetByCompanyId(int companyId)
        {
            if (companyId <= 0)
            {
                return BadRequest(
                    "Invalid company id, Id must be a positive integer."
                );
            }

            var features =
                await _companyFeatureService
                    .GetByCompanyIdAsync(companyId);

            return Ok(features);
        }


        // GET: api/CompanyFeature/1
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            if (id <= 0)
            {
                return BadRequest(
                    "Invalid feature id, Id must be a positive integer."
                );
            }

            var feature =
                await _companyFeatureService.GetByIdAsync(id);

            return Ok(feature);
        }


        // POST: api/CompanyFeature
        [HttpPost]
        [Authorize(Roles = "SuperAdmin,ContentManager")]
        public async Task<IActionResult> Create(
            CreateCompanyFeatureDto dto
        )
        {
            var id =
                await _companyFeatureService.CreateAsync(dto);

            return Ok(new { id });
        }


        // PUT: api/CompanyFeature/1
        [HttpPut("{id}")]
        [Authorize(Roles = "SuperAdmin,ContentManager")]
        public async Task<IActionResult> Update(
            int id,
            UpdateCompanyFeatureDto dto
        )
        {
            if (id != dto.Id)
            {
                return BadRequest("Id mismatch.");
            }

            await _companyFeatureService.UpdateAsync(dto);

            return Ok();
        }


        // DELETE: api/CompanyFeature/1
        [HttpDelete("{id}")]
        [Authorize(Roles = "SuperAdmin,ContentManager")]
        public async Task<IActionResult> Delete(int id)
        {
            if (id <= 0)
            {
                return BadRequest(
                    "Invalid feature id, Id must be a positive integer."
                );
            }

            await _companyFeatureService.DeleteAsync(id);

            return Ok();
        }
    }
}