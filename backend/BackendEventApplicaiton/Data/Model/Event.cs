namespace BackendEventApplicaiton.Data.Model
{
    public class Event
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public string Location { get; set; } = string.Empty;
        public int ParticipantsCount { get; set; }
        public int CategoryID { get; set; }
        public Category Category { get; set; }
        public ICollection<Booking> Bookings { get; set; }
        public ICollection<Participant> Participants { get; set; }
        public ICollection<Rating> Ratings { get; set; }
    }
}
