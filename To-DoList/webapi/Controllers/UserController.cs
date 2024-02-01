using Azure.Core;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.Entity;
using webapi.Models;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("ReactPolicy")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ToDoContext _context = new ToDoContext();


        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody] User request)
        {
            try
            {
                // Check if the password and confirm password match
                if (request.Password != request.ConfPassword)
                {
                    return BadRequest("Password and confirm password do not match.");
                }

                // Check if the username already exists
                if (await _context.Users.AnyAsync(u => u.UserName == request.UserName))
                {
                    return BadRequest("Username is already taken.");
                }

                // Create a new user
                var newUser = new User
                {
                    UserName = request.UserName,
                    Password = request.Password, // Note: In a production environment, you should hash the password.
                    ConfPassword = request.ConfPassword
                };

                // Add the user to the database
                _context.Users.Add(newUser);
                await _context.SaveChangesAsync();

                return Ok("User registered successfully");
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> SignIn([FromBody] User request)
        {
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName.Equals(request.UserName) && u.Password.Equals(request.Password));
                if (user == null)
                {
                    return BadRequest("Invalid username or password");
                }

                return Ok("Login successful");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}
