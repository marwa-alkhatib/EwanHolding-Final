using EwanHolding.Domain.Common;

namespace EwanHolding.Domain.Entities
{
    public class CompanyFeature : BaseEntity
    {
        public string Title_Ar { get; set; }
        public string Title_En { get; set; }

        public string Description_Ar { get; set; }
        public string Description_En { get; set; }

        public int DisplayOrder { get; set; }

        public int CompanyId { get; set; }
        public Company Company { get; set; }
    }
}