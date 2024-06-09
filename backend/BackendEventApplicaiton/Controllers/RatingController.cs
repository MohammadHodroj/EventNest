using BackendEventApplicaiton.Data.Model;
using BackendEventApplicaiton.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackendEventApplicaiton.Data.Dto;

namespace BackendEventApplicaiton.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RatingController : ControllerBase
    {
        private readonly ApplicationDbContext _Context;
        private readonly IConfiguration _configuration;
        public RatingController(ApplicationDbContext Context, IConfiguration configuration)
        {
            _Context = Context;
            _configuration = configuration;

        }
        [HttpPost("AddRating")]
        public async Task<IActionResult> AddRating(RatingDto dto)
        {
            try
            {
                var newBooking = new Rating
                {
                    UserID = dto.UserID,
                    EventID = dto.EventID,
                    Description = dto.Description,
                    CreatedDate = DateTime.Now,
                    Rate = dto.Rate,
                };
                await _Context.Ratings.AddAsync(newBooking);
                await _Context.SaveChangesAsync();
                return Ok("Booking added successfully!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException?.Message);
            }
        }
    }
}
