namespace Trackr.Models
{
    public class getValues
    {
        public string ApiKey { get; set; }
        public string Value { get; set; }
        public uint Offset { get; set; }
        public int Limit { get; set; }
        public string Order { get; set; }
    }
}