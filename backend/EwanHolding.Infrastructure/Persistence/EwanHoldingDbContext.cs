using Microsoft.EntityFrameworkCore;
using EwanHolding.Domain.Entities;

namespace EwanHolding.Infrastructure.Persistence
{
    public class EwanHoldingDbContext : DbContext
    {
        public EwanHoldingDbContext(
            DbContextOptions<EwanHoldingDbContext> options
        ) : base(options)
        {
        }

        public DbSet<Company> Companies => Set<Company>();
        public DbSet<News> News => Set<News>();
        public DbSet<Contact> Contacts => Set<Contact>();
        public DbSet<Media> Medias => Set<Media>();
        public DbSet<CoreValue> CoreValues => Set<CoreValue>();
        public DbSet<Stat> Stats => Set<Stat>();
        public DbSet<Service> Services => Set<Service>();
        public DbSet<CompanyFeature> CompanyFeatures => Set<CompanyFeature>();
        public DbSet<TermsAndConditions> TermsAndConditions => Set<TermsAndConditions>();
        public DbSet<InvestmentOpportunities> InvestmentOpportunities => Set<InvestmentOpportunities>();
        public DbSet<Admin> Admins => Set<Admin>();
        public DbSet<PageContent> PageContents => Set<PageContent>();


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            ConfigureEntities(modelBuilder);
        }


        private void ConfigureEntities(ModelBuilder modelBuilder)
        {
            // ==================================================
            // ADMIN
            // ==================================================

            modelBuilder.Entity<Admin>(entity =>
            {
                entity.Property(x => x.FullName)
                    .IsRequired()
                    .HasMaxLength(100);


                entity.Property(x => x.EmailVerificationCodeSentAt);


                entity.Property(x => x.Email)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.HasIndex(x => x.Email)
                    .IsUnique();

                entity.Property(x => x.PasswordHash)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(x => x.IsActive)
                    .IsRequired();

                entity.Property(x => x.Role)
                    .IsRequired();

                entity.Property(x => x.IsEmailSetupCompleted)
                    .IsRequired()
                    .HasDefaultValue(true);

                // Email verification
                entity.Property(x => x.PendingEmail)
                    .HasMaxLength(200);

                entity.Property(x => x.EmailVerificationCodeHash)
                    .HasMaxLength(256);

                entity.Property(x => x.EmailVerificationCodeExpiresAt);

                entity.Property(x => x.EmailVerificationAttempts)
                    .IsRequired()
                    .HasDefaultValue(0);
            });
            modelBuilder.Entity<Admin>(entity =>
            {
                entity.Property(x => x.FullName)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(x => x.Email)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.HasIndex(x => x.Email)
                    .IsUnique();

                entity.Property(x => x.PasswordHash)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(x => x.IsActive)
                    .IsRequired();


                entity.Property(x => x.Role)
                    .IsRequired();

                entity.Property(x => x.IsEmailSetupCompleted)
                    .IsRequired()
                    .HasDefaultValue(true);


                entity.Property(x => x.IsEmailSetupCompleted)
                    .IsRequired()
                    .HasDefaultValue(true);
            });


            // ==================================================
            // COMPANY
            // ==================================================

            modelBuilder.Entity<Company>(entity =>
            {
                entity.Property(x => x.Name_Ar)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.HasIndex(x => x.Name_Ar)
                    .IsUnique();

                entity.Property(x => x.Name_En)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.HasIndex(x => x.Name_En)
                    .IsUnique();

                entity.Property(x => x.Description_Ar)
                    .IsRequired()
                    .HasMaxLength(2000);

                entity.Property(x => x.Description_En)
                    .IsRequired()
                    .HasMaxLength(2000);

                entity.Property(x => x.WebsiteUrl)
                    .HasMaxLength(500);

                entity.Property(x => x.LogoUrl)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.Property(x => x.IsActive)
                    .IsRequired();


                // Hero

                entity.Property(x => x.HeroTitle_Ar)
                    .HasMaxLength(500);

                entity.Property(x => x.HeroTitle_En)
                    .HasMaxLength(500);

                entity.Property(x => x.HeroDescription_Ar)
                    .HasMaxLength(2000);

                entity.Property(x => x.HeroDescription_En)
                    .HasMaxLength(2000);


                // Overview

                entity.Property(x => x.OverviewTitle_Ar)
                    .HasMaxLength(500);

                entity.Property(x => x.OverviewTitle_En)
                    .HasMaxLength(500);

                entity.Property(x => x.OverviewDescription1_Ar)
                    .HasMaxLength(3000);

                entity.Property(x => x.OverviewDescription1_En)
                    .HasMaxLength(3000);

                entity.Property(x => x.OverviewDescription2_Ar)
                    .HasMaxLength(3000);

                entity.Property(x => x.OverviewDescription2_En)
                    .HasMaxLength(3000);


                // Why Choose Us

                entity.Property(x => x.WhyChooseUsTitle_Ar)
                    .HasMaxLength(500);

                entity.Property(x => x.WhyChooseUsTitle_En)
                    .HasMaxLength(500);
            });


            // ==================================================
            // SERVICE
            // ==================================================

            modelBuilder.Entity<Service>(entity =>
            {
                entity.Property(x => x.Name_Ar)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.HasIndex(x => x.Name_Ar)
                    .IsUnique();

                entity.Property(x => x.Name_En)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.HasIndex(x => x.Name_En)
                    .IsUnique();

                entity.Property(x => x.Description_Ar)
                    .IsRequired()
                    .HasMaxLength(2000);

                entity.Property(x => x.Description_En)
                    .IsRequired()
                    .HasMaxLength(2000);

                entity.HasOne(x => x.Company)
                    .WithMany()
                    .HasForeignKey(x => x.CompanyId)
                    .OnDelete(DeleteBehavior.Cascade);
            });


            // ==================================================
            // COMPANY FEATURE
            // ==================================================

            modelBuilder.Entity<CompanyFeature>(entity =>
            {
                entity.Property(x => x.Title_Ar)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(x => x.Title_En)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(x => x.Description_Ar)
                    .IsRequired()
                    .HasMaxLength(2000);

                entity.Property(x => x.Description_En)
                    .IsRequired()
                    .HasMaxLength(2000);

                entity.Property(x => x.DisplayOrder)
                    .IsRequired();

                entity.HasOne(x => x.Company)
                    .WithMany()
                    .HasForeignKey(x => x.CompanyId)
                    .OnDelete(DeleteBehavior.Cascade);
            });


            // ==================================================
            // CORE VALUE
            // ==================================================

            modelBuilder.Entity<CoreValue>(entity =>
            {
                entity.Property(x => x.Title_Ar)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.HasIndex(x => x.Title_Ar)
                    .IsUnique();

                entity.Property(x => x.Title_En)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.HasIndex(x => x.Title_En)
                    .IsUnique();

                entity.Property(x => x.Description_Ar)
                    .IsRequired()
                    .HasMaxLength(2000);

                entity.Property(x => x.Description_En)
                    .IsRequired()
                    .HasMaxLength(2000);

                entity.Property(x => x.IconUrl)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.Property(x => x.DisplayOrder)
                    .IsRequired();
            });


            // ==================================================
            // STAT
            // ==================================================

            modelBuilder.Entity<Stat>(entity =>
            {
                entity.Property(x => x.Label_Ar)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.HasIndex(x => x.Label_Ar)
                    .IsUnique();

                entity.Property(x => x.Label_En)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.HasIndex(x => x.Label_En)
                    .IsUnique();

                entity.Property(x => x.Value)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(x => x.DisplayOrder)
                    .IsRequired();
            });


            // ==================================================
            // NEWS
            // ==================================================

            modelBuilder.Entity<News>(entity =>
            {
                entity.Property(x => x.Title_Ar)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(x => x.Title_En)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(x => x.Description_Ar)
                    .IsRequired()
                    .HasMaxLength(2000);

                entity.Property(x => x.Description_En)
                    .IsRequired()
                    .HasMaxLength(2000);
            });


            // ==================================================
            // CONTACT
            // ==================================================

            modelBuilder.Entity<Contact>(entity =>
            {
                entity.Property(x => x.FullName)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.Property(x => x.Email)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(x => x.Phone)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(x => x.Subject)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(x => x.Message)
                    .IsRequired()
                    .HasMaxLength(2000);
            });


            // ==================================================
            // MEDIA
            // ==================================================

            modelBuilder.Entity<Media>(entity =>
            {
                entity.Property(x => x.Url)
                    .IsRequired()
                    .HasMaxLength(500);
            });


            // ==================================================
            // TERMS AND CONDITIONS
            // ==================================================

            modelBuilder.Entity<TermsAndConditions>(entity =>
            {
                entity.Property(x => x.TitleAr)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(x => x.TitleEn)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(x => x.Description_Ar)
                    .IsRequired()
                    .HasMaxLength(5000);

                entity.Property(x => x.Description_En)
                    .IsRequired()
                    .HasMaxLength(5000);
            });


            // ==================================================
            // PAGE CONTENT
            // ==================================================

            modelBuilder.Entity<PageContent>(entity =>
            {
                entity.Property(x => x.Key)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.HasIndex(x => x.Key)
                    .IsUnique();

                entity.Property(x => x.PageName)
                    .IsRequired()
                    .HasMaxLength(100);
            });
        }
    }
}