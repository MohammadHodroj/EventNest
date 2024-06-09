namespace BackendEventApplicaiton.Data.Model
{
    public class Rating
    {
        public int Id { get; set; }
        public int UserID { get; set; }
        public int EventID { get; set; }
        public int Rate {  get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public User User { get; set; }
        public Event Event { get; set; }
    }
}
