using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.Entity;
using webapi.Models;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToDoController : ControllerBase
    {
        private readonly ToDoContext _context = new ToDoContext();

        [HttpGet]
        public async Task<IActionResult> GetToDoList([FromQuery] int userId)
        {
            try
            {
                // Retrieve the to-do list for the specified user ID
                var toDoList = await _context.ToDo
                    .Where(todo => todo.user_id == userId)
                    .ToListAsync();
                return Ok(toDoList);
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, "Internal Server Error");

            }
        }

        [HttpPost]
        public async Task<IActionResult> AddToDoItem([FromQuery] int userId, [FromBody] ToDo request)
        {
            try
            {
                // Associate the to-do item with the specified user ID
                request.user_id = userId;

                _context.ToDo.Add(request);
                await _context.SaveChangesAsync();

                return Ok("To-Do item added successfully");
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateToDoItem(int id)
        {
            try
            {
                var toDoItem = await _context.ToDo.FindAsync(id);

                if (toDoItem == null)
                {
                    return NotFound("To-Do item not found");
                }

                toDoItem.Status = true;

                _context.ToDo.Update(toDoItem);
                await _context.SaveChangesAsync();

                return Ok("To-Do item updated successfully");
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteToDoItem(int id)
        {
            try
            {
                var toDoItem = await _context.ToDo.FindAsync(id);

                if (toDoItem == null)
                {
                    return NotFound("To-Do item not found");
                }

                _context.ToDo.Remove(toDoItem);
                await _context.SaveChangesAsync();

                return Ok("To-Do item deleted successfully");
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, "Internal Server Error");
            }
        }

    }
}
