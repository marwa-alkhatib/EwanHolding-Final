using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EwanHolding.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddAdminEmailSetup : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsEmailSetupCompleted",
                table: "Admins",
                type: "bit",
                nullable: false,
                defaultValue: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsEmailSetupCompleted",
                table: "Admins");
        }
    }
}
