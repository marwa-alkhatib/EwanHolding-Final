using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EwanHolding.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddCompanyDetailsFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "HeroDescription_Ar",
                table: "Companies",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "HeroDescription_En",
                table: "Companies",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "HeroTitle_Ar",
                table: "Companies",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "HeroTitle_En",
                table: "Companies",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OverviewDescription1_Ar",
                table: "Companies",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OverviewDescription1_En",
                table: "Companies",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OverviewDescription2_Ar",
                table: "Companies",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OverviewDescription2_En",
                table: "Companies",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OverviewTitle_Ar",
                table: "Companies",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OverviewTitle_En",
                table: "Companies",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "WhyChooseUsTitle_Ar",
                table: "Companies",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "WhyChooseUsTitle_En",
                table: "Companies",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HeroDescription_Ar",
                table: "Companies");

            migrationBuilder.DropColumn(
                name: "HeroDescription_En",
                table: "Companies");

            migrationBuilder.DropColumn(
                name: "HeroTitle_Ar",
                table: "Companies");

            migrationBuilder.DropColumn(
                name: "HeroTitle_En",
                table: "Companies");

            migrationBuilder.DropColumn(
                name: "OverviewDescription1_Ar",
                table: "Companies");

            migrationBuilder.DropColumn(
                name: "OverviewDescription1_En",
                table: "Companies");

            migrationBuilder.DropColumn(
                name: "OverviewDescription2_Ar",
                table: "Companies");

            migrationBuilder.DropColumn(
                name: "OverviewDescription2_En",
                table: "Companies");

            migrationBuilder.DropColumn(
                name: "OverviewTitle_Ar",
                table: "Companies");

            migrationBuilder.DropColumn(
                name: "OverviewTitle_En",
                table: "Companies");

            migrationBuilder.DropColumn(
                name: "WhyChooseUsTitle_Ar",
                table: "Companies");

            migrationBuilder.DropColumn(
                name: "WhyChooseUsTitle_En",
                table: "Companies");
        }
    }
}
