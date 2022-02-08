using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SinasAPI.Models;
using SinasAPI.Models.RequestModels;
using SinasAPI.Models.ResponseModels;
using SinasAPI.Services;
using SinasAPI.Auth;

namespace SinasAPI.Controllers;

[ApiController]
[Route("user")]
public class UserController : ControllerBase
{
    private readonly UserService _userService;

    public UserController(UserService userService)
    {
        _userService = userService;
    }

    [HttpPost]
    public async Task<string> CreateUser()
    {   
        // Get the request data
        CreateUserRequest request = JsonConvert.DeserializeObject<CreateUserRequest>(await Utils.StreamToString(HttpContext.Request.Body));
        
        // Check if request is valid
        if (!request.IsValid())
        {
            return JsonConvert.SerializeObject(new GenericResponse("error", "invalid_data"));
        }

        // Check if username already exists
        if (_userService.CheckUserExists(request.Username))
        {
            return JsonConvert.SerializeObject(new GenericResponse("error", "username_already_exists"));
        }

        // Creates the user in the database
        await _userService.CreateAsync(new User(request));

        return JsonConvert.SerializeObject(new GenericResponse("ok"));
    }

    [HttpDelete]
    [BasicAuth("User Management")]
    public async Task<string> DeleteUser()
    {
        // Get the request data
        DeleteUserRequest request = JsonConvert.DeserializeObject<DeleteUserRequest>(await Utils.StreamToString(HttpContext.Request.Body));

        if (!request.IsValid())
        {
            return JsonConvert.SerializeObject(new GenericResponse("error", "invalid_data"));
        }

        

        // Authorization Check
        var @If = User;

        
        return "s";
    }

    

}
