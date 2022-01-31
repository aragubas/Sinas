using Newtonsoft.Json;

namespace SinasAPI.Models.ResponseModels
{
    public partial class GenericResponse
    {
        [JsonProperty("result")]
        public string Result;
        
        [JsonProperty("error_message")]
        public string ErrorMessage;

        public GenericResponse(string result, string errorMessage)
        {
            Result = result;
            ErrorMessage = errorMessage;
        }

        public GenericResponse(string result)
        {
            Result = result;
            ErrorMessage = "no_error_provided";
        }


    }

}