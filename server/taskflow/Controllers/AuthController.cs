using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using taskflow.Models.DTO;
using taskflow.Repositories;

namespace taskflow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<IdentityUser> userManager;
        private readonly ITokenRepository tokenRepository;

        public AuthController(UserManager<IdentityUser> userManager, ITokenRepository tokenRepository)
        {
            this.userManager = userManager;
            this.tokenRepository = tokenRepository;
        }

                
        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDto registerRequestDto)
        {
            var identityUser = new IdentityUser
            {
                UserName = registerRequestDto.Username,
                Email = registerRequestDto.Username
            };

            var identityResult = await userManager.CreateAsync(identityUser, registerRequestDto.Password);

            if (identityResult.Succeeded)
            {
                return Ok("User was registered! Please login");
            }

            return BadRequest("Something went wrong, try again");
        }
        
        // Login route
        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto loginRequestDto)
        {
            // FInd the user by email
            var user = await userManager.FindByEmailAsync(loginRequestDto.Username);
            if (user != null)
            {
                // Validate the supplied password
                var checkPasswordResult = await userManager.CheckPasswordAsync(user, loginRequestDto.Password);
                if (checkPasswordResult)
                {
                    var jwtToken = tokenRepository.CreateJWTToken(user);

                    var response = new LoginResponseDto
                    {
                        JwtToken = jwtToken
                    };
                        
                    return Ok(response);
                }
            }

            return BadRequest("Username or password incorrect");
        }
        
    }
}

