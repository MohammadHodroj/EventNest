using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BackendEventApplicaiton.Data.Model
{
    public class User
    {
        public int Id { get; set; }
        [Required]
        [StringLength(50, MinimumLength = 4)]
        public string Username { get; set; } = string.Empty;
        [Required]
        public string Email { get; set; } = string.Empty;
        [Required]
        [DataType(DataType.Password)]
        [JsonIgnore]
        public byte[] PasswordHash { get; set; }
        [JsonIgnore]
        public byte[] PasswordSalt { get; set; }
        public bool IsAdmin { get; set; }
        public ICollection<Booking> Bookings { get; set; }
        public ICollection<Participant> Participants { get; set; }
        public ICollection<Rating> Ratings { get; set; }
    }
}
