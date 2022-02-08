using System.Net.Http.Headers;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Server.HttpSys;
using SinasAPI.Models;
using SinasAPI.Services;

namespace SinasAPI.Auth
{   
    public class BasicAuthAttribute : TypeFilterAttribute
    {
        public BasicAuthAttribute(string realm = "My realm") : base(typeof(BasicAuthFilter))
        {
            Arguments = new object[] { realm };
        }
    }

    public class BasicAuthFilter : IAuthorizationFilter
    {
        private readonly string _realm;

        public BasicAuthFilter(string realm = "global")
        {
            _realm = realm;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            try
            {
                // Get AuthHeader
                string authHeader = context.HttpContext.Request.Headers.Authorization;
                
                if (authHeader != null)
                {
                    AuthenticationHeaderValue authHeaderValue = AuthenticationHeaderValue.Parse(authHeader);

                    // Checks if authentication method is "Basic"
                    if (authHeaderValue.Scheme.Equals("Basic", StringComparison.OrdinalIgnoreCase))
                    {
                        var credentials = Encoding.UTF8.GetString(Convert.FromBase64String(authHeaderValue.Parameter ?? string.Empty)).Split(":", 2);

                        // Validate Credentials
                        if (credentials.Length == 2 && IsAuthorized(context, credentials[0], credentials[1]))
                        {
                            
                            return;
                        }
                    }


                }

                ReturnUnauthorizedResult(context);

            }catch(FormatException)
            {
                ReturnUnauthorizedResult(context);
            }
        }

        private bool IsAuthorized(AuthorizationFilterContext context, string email_address, string password)
        {
            var userService = context.HttpContext.RequestServices.GetRequiredService<UserService>();
  
            return userService.CheckUserCredentials(email_address, password);
        } 

        private void ReturnUnauthorizedResult(AuthorizationFilterContext context)
        {
            context.HttpContext.Response.Headers.WWWAuthenticate = $"Basic realm=\"{_realm}\"";
            context.Result = new UnauthorizedResult();
        }

    }
}