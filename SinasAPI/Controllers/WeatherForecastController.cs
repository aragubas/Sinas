using Microsoft.AspNetCore.Mvc;

namespace SinasAPI.Controllers;

[ApiController]
[Route("sinas")]
public class WeatherForecastController : ControllerBase
{

    private readonly ILogger<WeatherForecastController> _logger;

    public WeatherForecastController(ILogger<WeatherForecastController> logger)
    {
        _logger = logger;
    }

    [HttpGet("helloworld")]
    public string HelloWorld()
    {
        
        return "Hello World"; 
    }
}
