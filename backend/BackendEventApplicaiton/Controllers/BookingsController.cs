using BackendEventApplicaiton.Data.Model;
using BackendEventApplicaiton.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackendEventApplicaiton.Data.Dto;

namespace BackendEventApplicaiton.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingsController : ControllerBase
    {
        private readonly ApplicationDbContext _Context;
        private readonly IConfiguration _configuration;
        public BookingsController(ApplicationDbContext Context, IConfiguration configuration)
        {
            _Context = Context;
            _configuration = configuration;

        }


        [HttpGet("GetBookings")]
        public async Task<IActionResult> GetBookings()
        {
            try
            {
                
                var bookings = await _Context.Bookings
                    .Include(b => b.User)
                    .Include(b => b.Event)
                    .Select(b => new
                    {
                        UserId = b.User.Id,
                        Email = b.User.Email,
                        Event = b.Event 
                    })
                    .ToListAsync();

                return Ok(bookings);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("GetBookings/{id}")]
        public async Task<IActionResult> GetBookingsByUserId(int id)
        {
            try
            {
                
                var bookings = await _Context.Bookings
                    .Where(a=>a.UserID == id)
                    .Include(b => b.User)
                    .Include(b => b.Event)
                    .Select(b => new
                    {
                        UserId = b.User.Id,
                        Email = b.User.Email,
                        Event = b.Event
                    })
                    .ToListAsync();

                return Ok(bookings);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }




        [HttpPost("AddBooking")]
        public async Task<IActionResult> AddBooking(BookingDto dto)
        {
            try
            {
                var existingBooking = await _Context.Bookings.FirstOrDefaultAsync(b => b.UserID == dto.UserID && b.EventID == dto.EventID);
                if (existingBooking != null)
                {
                    return Conflict("User already has a booking for this event.");
                }

                
                var user = await _Context.Users.FindAsync(dto.UserID);
                var @event = await _Context.Events.FindAsync(dto.EventID);

                if (user == null || @event == null)
                {
                    return NotFound("User or Event not found.");
                }

                
                var newBooking = new Booking
                {
                    UserID = dto.UserID,
                    User = user,
                    EventID = dto.EventID,
                    Event = @event
                };

                
                @event.ParticipantsCount++;

                await _Context.Bookings.AddAsync(newBooking);
                await _Context.SaveChangesAsync();
                return Ok("Booking added successfully!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException?.Message ?? ex.Message);
            }
        }


        [HttpPost("DeleteBooking")]
        public async Task<IActionResult> DeleteEvent(int userId, int eventId)
        {
            try
            {
                var existingBooking = await _Context.Bookings.FirstOrDefaultAsync(b => b.UserID == userId && b.EventID == eventId);

                if (existingBooking == null)
                {
                    return NotFound("Booking not found");
                }

                _Context.Bookings.Remove(existingBooking);
                await _Context.SaveChangesAsync();

                return Ok("Booking deleted successfully");
            }
            catch (Exception ex)
            {
                
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


    }
}
