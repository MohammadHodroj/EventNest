using System.ComponentModel.DataAnnotations;

namespace BackendEventApplicaiton.Data.Dto
{
    public class CategoryDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }
    }
}
