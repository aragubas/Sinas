using SinasAPI.Models;
using SinasAPI.Services;

namespace SinasAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.Configure<UserDatabaseSettings>(builder.Configuration.GetSection("UsersDatabaseSettings"));
            builder.Services.AddSingleton<UserService>();

            builder.Services.AddControllers();

            WebApplication app = builder.Build();

            // Configure the HTTP request pipeline.
            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();

        }
    }

}


