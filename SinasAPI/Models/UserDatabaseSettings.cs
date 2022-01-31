namespace SinasAPI.Models
{
    public class UserDatabaseSettings
    {
        public string ConnectionString { get; set; } = null!;
        public string Database { get; set; } = null!;
        public string Collection { get; set; } = null!;

    }
}