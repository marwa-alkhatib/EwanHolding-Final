using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EwanHolding.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddAdminEmailVerification : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "EmailVerificationAttempts",
                table: "Admins",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "EmailVerificationCodeExpiresAt",
                table: "Admins",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EmailVerificationCodeHash",
                table: "Admins",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "EmailVerificationCodeSentAt",
                table: "Admins",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PendingEmail",
                table: "Admins",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EmailVerificationAttempts",
                table: "Admins");

            migrationBuilder.DropColumn(
                name: "EmailVerificationCodeExpiresAt",
                table: "Admins");

            migrationBuilder.DropColumn(
                name: "EmailVerificationCodeHash",
                table: "Admins");

            migrationBuilder.DropColumn(
                name: "EmailVerificationCodeSentAt",
                table: "Admins");

            migrationBuilder.DropColumn(
                name: "PendingEmail",
                table: "Admins");
        }
    }
}
