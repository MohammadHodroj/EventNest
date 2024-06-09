using BackendEventApplicaiton.Data.Model;
using BackendEventApplicaiton.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackendEventApplicaiton.Data.Dto;
using System.Threading.Tasks;

namespace BackendEventApplicaiton.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly ApplicationDbContext _Context;
        private readonly IConfiguration _configuration;
        public EventsController(ApplicationDbContext Context, IConfiguration configuration)
        {
            _Context = Context;
            _configuration = configuration;

        }


        [HttpGet("GetEvents")]
        public async Task<IActionResult> GetEvents()
        {
            try
            {
                var events = await _Context.Events.ToListAsync();
                return Ok(events);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }



        [HttpPost("AddEvent")]
        public async Task<IActionResult> AddEvent(EventDto dto)
        {
            try
            {
                var newEvent = new Event
                {
                    Name = dto.Name,
                    Description = dto.Description,
                    Date = dto.Date,
                    Location = dto.Location,
                    CategoryID = dto.CategoryID,
                    ParticipantsCount = 0
                };

                await _Context.Events.AddAsync(newEvent);
                await _Context.SaveChangesAsync();

                return Ok("Event created successfully!");
            }
            catch (Exception ex)
            {

                return BadRequest(ex.InnerException?.Message);
            }
        }

        [HttpPost("JoinEvent")]
        public async Task<IActionResult> JoinEvent(int userId, int eventId)
        {
            try
            {
                var eventEntity = await _Context.Events.FindAsync(eventId);
                if (eventEntity == null)
                {
                    return NotFound("Event not found");
                }

                
                var participant = new Participant
                {
                    UserId = userId,
                    User = await _Context.Users.FindAsync(userId),
                    EventId = eventId,
                    Event = eventEntity
                };

                await _Context.Participants.AddAsync(participant);
                eventEntity.ParticipantsCount++;
                await _Context.SaveChangesAsync();

                return Ok("Joined event successfully!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException?.Message ?? ex.Message);
            }
        }


        [HttpPost("EditEvent")]
        public async Task<IActionResult> EditEvent(int eventId, EventDto updatedEventDto)
        {
            try
            {
                
                var existingEvent = await _Context.Events.FindAsync(eventId);

                if (existingEvent == null)
                {
                    return NotFound("Event not found");
                }

              
                existingEvent.Name = updatedEventDto.Name;
                existingEvent.Description = updatedEventDto.Description;
                existingEvent.Date = updatedEventDto.Date;
                existingEvent.Location = updatedEventDto.Location;
                existingEvent.CategoryID = updatedEventDto.CategoryID;  
                 

                
                await _Context.SaveChangesAsync();

                return Ok("Event updated successfully");
            }
            catch (Exception ex)
            {
                
                return StatusCode(StatusCodes.Status500InternalServerError, ex.InnerException?.Message ?? ex.Message);
            }
        }

        [HttpPost("DeleteEvent")]
        public async Task<IActionResult> DeleteEvent(int eventId)
        {
            try
            {
                var existingEvent = await _Context.Events.FindAsync(eventId);
                if (existingEvent == null)
                {
                    return NotFound("Event not found");
                }
                _Context.Events.Remove(existingEvent);
                await _Context.SaveChangesAsync();
                return Ok("Event deleted successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("GetEventDetails/{eventId}")]
        public async Task<IActionResult> GetEventDetails(int eventId)
        {
            try
            {
                var eventEntity = await _Context.Events
                    .Include(e => e.Participants)
                    .FirstOrDefaultAsync(e => e.Id == eventId);

                if (eventEntity == null)
                {
                    return NotFound("Event not found");
                }

                return Ok(eventEntity);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }



    }
}