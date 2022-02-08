using Newtonsoft.Json;

namespace SinasAPI.Models.RequestModels
{
    public class DeleteUserRequest : IRequestModelBase
    {
        [JsonProperty("email_address")]
        public string EmailAddress;

        [JsonProperty("password")]
        public string Password;

        public bool IsValid()
        {
            return !(EmailAddress == null || Password == null);
        }
    }
}