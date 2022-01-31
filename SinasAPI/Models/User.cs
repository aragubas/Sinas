using Microsoft.AspNetCore.Identity;
using MongoDB.Bson.Serialization.Attributes;
using SinasAPI.Models.RequestModels;

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

        public User(CreateUserRequest createUserRequest)
        {
            Id = Guid.NewGuid().ToString();
             
            Username = createUserRequest.Username.Trim();
            
            PasswordHasher<string> passwordHasher = new PasswordHasher<string>();
            Password = passwordHasher.HashPassword(Username, createUserRequest.Password);
            
            EmailAddress = createUserRequest.EmailAddress;
        }
    }
}