namespace BackendEventApplicaiton.Data.Dto
{
    public class RatingDto
    {
        public int UserID { get; set; }
        public int EventID { get; set; }
        public int Rate { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
