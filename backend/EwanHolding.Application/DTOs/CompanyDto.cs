namespace EwanHolding.Application.DTOs
{
    public class CreateCompanyDto
    {
        // Basic Information
        public string Name_Ar { get; set; }
        public string Name_En { get; set; }
        public string Description_Ar { get; set; }
        public string Description_En { get; set; }
        public string WebsiteUrl { get; set; }
        public string LogoUrl { get; set; }
        public bool IsActive { get; set; } = true;

        // Hero
        public string? HeroTitle_Ar { get; set; }
        public string? HeroTitle_En { get; set; }
        public string? HeroDescription_Ar { get; set; }
        public string? HeroDescription_En { get; set; }

        // Overview
        public string? OverviewTitle_Ar { get; set; }
        public string? OverviewTitle_En { get; set; }
        public string? OverviewDescription1_Ar { get; set; }
        public string? OverviewDescription1_En { get; set; }
        public string? OverviewDescription2_Ar { get; set; }
        public string? OverviewDescription2_En { get; set; }

        // Why Choose Us
        public string? WhyChooseUsTitle_Ar { get; set; }
        public string? WhyChooseUsTitle_En { get; set; }
    }


    public class UpdateCompanyDto
    {
        public int Id { get; set; }

        // Basic Information
        public string Name_Ar { get; set; }
        public string Name_En { get; set; }
        public string Description_Ar { get; set; }
        public string Description_En { get; set; }
        public string WebsiteUrl { get; set; }
        public string LogoUrl { get; set; }
        public bool IsActive { get; set; } = true;

        // Hero
        public string? HeroTitle_Ar { get; set; }
        public string? HeroTitle_En { get; set; }
        public string? HeroDescription_Ar { get; set; }
        public string? HeroDescription_En { get; set; }

        // Overview
        public string? OverviewTitle_Ar { get; set; }
        public string? OverviewTitle_En { get; set; }
        public string? OverviewDescription1_Ar { get; set; }
        public string? OverviewDescription1_En { get; set; }
        public string? OverviewDescription2_Ar { get; set; }
        public string? OverviewDescription2_En { get; set; }

        // Why Choose Us
        public string? WhyChooseUsTitle_Ar { get; set; }
        public string? WhyChooseUsTitle_En { get; set; }
    }


    public class CompanyResponseDto
    {
        public int Id { get; set; }

        // Basic Information
        public string Name_Ar { get; set; }
        public string Name_En { get; set; }
        public string Description_Ar { get; set; }
        public string Description_En { get; set; }
        public string WebsiteUrl { get; set; }
        public string LogoUrl { get; set; }
        public bool IsActive { get; set; }

        // Hero
        public string? HeroTitle_Ar { get; set; }
        public string? HeroTitle_En { get; set; }
        public string? HeroDescription_Ar { get; set; }
        public string? HeroDescription_En { get; set; }

        // Overview
        public string? OverviewTitle_Ar { get; set; }
        public string? OverviewTitle_En { get; set; }
        public string? OverviewDescription1_Ar { get; set; }
        public string? OverviewDescription1_En { get; set; }
        public string? OverviewDescription2_Ar { get; set; }
        public string? OverviewDescription2_En { get; set; }

        // Why Choose Us
        public string? WhyChooseUsTitle_Ar { get; set; }
        public string? WhyChooseUsTitle_En { get; set; }

        // Company Media
        public List<MediaResponseDto> Media { get; set; } = new();
    }
}