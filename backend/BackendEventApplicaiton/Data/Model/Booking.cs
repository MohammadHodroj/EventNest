namespace BackendEventApplicaiton.Data.Model
{
    public class Booking
    {
        public int Id { get; set; }
        public int UserID { get; set; }
        public int EventID { get; set; }
        public Event Event { get; set; }
        public User User { get; set; }
    }
}
