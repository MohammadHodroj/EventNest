using System.ComponentModel.DataAnnotations;

namespace BackendEventApplicaiton.Data.Model
{
    public class Category
    {
        public int CategoryID { get; set; }
        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }
        public ICollection<Event> Events { get; set; }
    }
}
