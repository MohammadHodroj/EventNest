using BackendEventApplicaiton.Data.Model;
using BackendEventApplicaiton.Data;
using Microsoft.AspNetCore.Mvc;
using BackendEventApplicaiton.Data.Dto;
using Microsoft.EntityFrameworkCore;

namespace BackendEventApplicaiton.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ApplicationDbContext _Context;
        private readonly IConfiguration _configuration;

        public CategoryController(ApplicationDbContext context, IConfiguration configuration)
        {
            _Context = context;
            _configuration = configuration;
        }

        [HttpPost("AddCategory")]
        public async Task<IActionResult> AddCategory(CategoryDto dto)
        {
            try
            {
                var newCategory = new Category
                {
                    Name = dto.Name,
                    Description = dto.Description
                };
                await _Context.Categories.AddAsync(newCategory);
                await _Context.SaveChangesAsync();
                return Ok("Category added successfully!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException?.Message);
            }
        }

        [HttpGet("GetCategories")]
        public async Task<IActionResult> GetCategories()
        {
            try
            {
                var categories = await _Context.Categories.ToListAsync();
                return Ok(categories);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
