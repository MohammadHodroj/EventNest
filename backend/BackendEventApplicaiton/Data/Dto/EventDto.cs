﻿namespace BackendEventApplicaiton.Data.Dto
{
    public class EventDto
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public string Location { get; set; } = string.Empty;
        public int CategoryID { get; set; }
    }
}
