using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webapi.Migrations
{
    /// <inheritdoc />
    public partial class entity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "ToDo",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ToDo_UserId",
                table: "ToDo",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_ToDo_Users_UserId",
                table: "ToDo",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ToDo_Users_UserId",
                table: "ToDo");

            migrationBuilder.DropIndex(
                name: "IX_ToDo_UserId",
                table: "ToDo");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "ToDo");
        }
    }
}
