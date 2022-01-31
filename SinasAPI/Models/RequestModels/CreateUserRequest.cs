using Newtonsoft.Json;

namespace SinasAPI.Models.RequestModels
{
    public class CreateUserRequest : IRequestModelBase
    {
        [JsonProperty("username")]
        public string Username;

        [JsonProperty("password")]
        public string Password;

        [JsonProperty("email_address")]
        public string EmailAddress;

        public bool IsValid()
        {
            return !(Username == null || Password == null || EmailAddress == null || Username.Length > 16 );
        }
    }
}