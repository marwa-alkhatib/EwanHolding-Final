namespace EwanHolding.Application.DTOs
{
    public class CreateCompanyFeatureDto
    {
        public string Title_Ar { get; set; }
        public string Title_En { get; set; }

        public string Description_Ar { get; set; }
        public string Description_En { get; set; }

        public int DisplayOrder { get; set; }

        public int CompanyId { get; set; }
    }


    public class UpdateCompanyFeatureDto
    {
        public int Id { get; set; }

        public string Title_Ar { get; set; }
        public string Title_En { get; set; }

        public string Description_Ar { get; set; }
        public string Description_En { get; set; }

        public int DisplayOrder { get; set; }

        public int CompanyId { get; set; }
    }


    public class CompanyFeatureResponseDto
    {
        public int Id { get; set; }

        public string Title_Ar { get; set; }
        public string Title_En { get; set; }

        public string Description_Ar { get; set; }
        public string Description_En { get; set; }

        public int DisplayOrder { get; set; }

        public int CompanyId { get; set; }

        public string CompanyName_Ar { get; set; }
        public string CompanyName_En { get; set; }
    }
}