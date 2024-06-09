using BackendEventApplicaiton.Data;
using BackendEventApplicaiton.Data.Dto;
using BackendEventApplicaiton.Data.Model;
using BackendEventApplicaiton.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace BackendEventApplicaiton.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _Context;
        private readonly IConfiguration _configuration;

        public AuthController(ApplicationDbContext Context, IConfiguration configuration)
        {
            _Context = Context;
            _configuration = configuration;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var user = await _Context.Users.Where(u => u.Email == dto.Email).FirstOrDefaultAsync();
                if (user != null)
                {
                    return BadRequest($"Email {dto.Email} already exists");
                }
                Hashing hashing = new Hashing();
                byte[] passwordHash, passwordSalt;
                hashing.CreatePasswordHash(dto.Password, out passwordHash, out passwordSalt);
                var person = new User
                {
                    Username = dto.UserName,
                    Email = dto.Email,
                    PasswordHash = passwordHash,
                    PasswordSalt = passwordSalt,
                    IsAdmin = dto.IsAdmin
                };

                await _Context.Users.AddAsync(person);
                await _Context.SaveChangesAsync();
                return Ok("Account created successfully!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("Login")]
        public async Task<string> Login(UserDto dto)
        {

            try
            {
                var user = await _Context.Users.Where(u => u.Email == dto.Email).FirstOrDefaultAsync();
                Hashing hash = new Hashing();
                // if user is not found
                if (user == null || !hash.verifyPassword(dto.Password, user.PasswordHash, user.PasswordSalt))
                    throw new Exception("incorrect email or password");

                var token = CreateToken(user);
                return token;
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        private string CreateToken(User client)
        {
            string role = "User";
            if (client.IsAdmin)
            {
                role = "Admin";
            }

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name , client.Username),
                new Claim(ClaimTypes.Role, role)
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
                _configuration.GetSection("JWT:Token").Value!));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token) + "$" + client.Id + "$" + client.IsAdmin;

            return jwt;
        }


        [HttpGet("GetUsers")]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
        {
            try
            {
                var users = await _Context.Users.Select(u => new UserDto
                {
                    Id = u.Id,
                    Email = u.Email,
                    IsAdmin = u.IsAdmin
                }).ToListAsync();

                return Ok(users);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpDelete("DeleteUser/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            try
            {
                var user = await _Context.Users.FindAsync(id);
                if (user == null)
                {
                    return NotFound("User not found");
                }

                _Context.Users.Remove(user);
                await _Context.SaveChangesAsync();
                return Ok("User deleted successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
