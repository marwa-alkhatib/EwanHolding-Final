
using EwanHolding.Domain.Common;
using EwanHolding.Domain.Enums;

namespace EwanHolding.Domain.Entities
{
    public class Admin : BaseEntity
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public bool IsActive { get; set; } = true;
        public AdminRole Role { get; set; }
        public DateTime? LastLoginAt { get; set; }

        // First-time email setup
        public bool IsEmailSetupCompleted { get; set; } = true;

        // Mandatory password change
        public bool MustChangePassword { get; set; } = false;

        // Email verification
        public string? PendingEmail { get; set; }
        public string? EmailVerificationCodeHash { get; set; }
        public DateTime? EmailVerificationCodeExpiresAt { get; set; }
        public int EmailVerificationAttempts { get; set; } = 0;
        public DateTime? EmailVerificationCodeSentAt { get; set; }
    }
}
