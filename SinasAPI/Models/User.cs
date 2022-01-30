using MongoDB.Bson.Serialization.Attributes;

namespace SinasAPI.Models
{
    public class User
    {
        [BsonId]
        [BsonElement("id")]
        public string Id;
        
        [BsonElement("username")]
        public string Username;

        [BsonElement("password")]
        public string Password;
        
        [BsonElement("email_address")]
        public string EmailAddress;

    }
}