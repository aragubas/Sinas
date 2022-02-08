using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using SinasAPI.Models;

namespace SinasAPI.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> _userCollection;

        public UserService(IOptions<UserDatabaseSettings> userDatabaseSettings)
        {
            var mongoClient = new MongoClient(userDatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(userDatabaseSettings.Value.Database);

            _userCollection = mongoDatabase.GetCollection<User>(userDatabaseSettings.Value.Collection);
        }

        public async Task CreateAsync(User newUser)
        {
            await _userCollection.InsertOneAsync(newUser);
        }   

        public bool CheckUserCredentials(string email_address, string Password)
        {
            PasswordHasher<string> hasher = new PasswordHasher<string>();
            User retrivedUser =  _userCollection.Find<User>(user => user.EmailAddress == email_address).FirstOrDefault();

            // Check if user is valid
            if (retrivedUser == null) { return false; }

            PasswordVerificationResult result = hasher.VerifyHashedPassword(retrivedUser.Username, retrivedUser.Password, Password);

            return result == PasswordVerificationResult.Success;
        }
 
        public async Task DeleteAsync(string id)
        {
            await _userCollection.DeleteOneAsync(user => user.Id == id);
        }

        public bool CheckUserExists(string username)
        {
            return _userCollection.Find(user => user.Username == username).CountDocuments() > 0;
        }

    }
}