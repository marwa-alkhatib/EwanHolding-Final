using EwanHolding.Domain.Common;

namespace EwanHolding.Domain.Entities
{
    public class Company : BaseEntity
    {
        // Basic Information
        public string Name_Ar { get; set; }
        public string Name_En { get; set; }

        public string Description_Ar { get; set; }
        public string Description_En { get; set; }

        public string WebsiteUrl { get; set; }
        public string LogoUrl { get; set; }

        public bool IsActive { get; set; } = true;


        // Hero Section
        public string? HeroTitle_Ar { get; set; }
        public string? HeroTitle_En { get; set; }

        public string? HeroDescription_Ar { get; set; }
        public string? HeroDescription_En { get; set; }


        // Overview Section
        public string? OverviewTitle_Ar { get; set; }
        public string? OverviewTitle_En { get; set; }

        public string? OverviewDescription1_Ar { get; set; }
        public string? OverviewDescription1_En { get; set; }

        public string? OverviewDescription2_Ar { get; set; }
        public string? OverviewDescription2_En { get; set; }


        // Why Choose Us Section
        public string? WhyChooseUsTitle_Ar { get; set; }
        public string? WhyChooseUsTitle_En { get; set; }
    }
}