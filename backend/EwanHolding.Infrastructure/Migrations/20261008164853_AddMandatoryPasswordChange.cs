using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EwanHolding.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddMandatoryPasswordChange : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "MustChangePassword",
                table: "Admins",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MustChangePassword",
                table: "Admins");
        }
    }
}
