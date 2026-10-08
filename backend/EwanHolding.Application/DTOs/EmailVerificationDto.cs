
namespace EwanHolding.Application.DTOs
{
    public class SendEmailVerificationDto
    {
        public string NewEmail { get; set; } = string.Empty;
    }

    public class VerifyEmailCodeDto
    {
        public string Code { get; set; } = string.Empty;
    }
}
