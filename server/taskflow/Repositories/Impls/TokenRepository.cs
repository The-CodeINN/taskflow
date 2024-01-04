using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using taskflow.Repositories.Interfaces;

namespace taskflow.Repositories.Impls
{
    public class TokenRepository(IConfiguration configuration) : ITokenRepository
    {
        public string CreateJwtToken(IdentityUser user)
        {
            // Create claims
            var claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.Email, user.Email));
            
            // Add roles to claims
            /*foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }*/

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                configuration["Jwt:Issuer"],
                configuration["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(15),
                signingCredentials: credentials
            );
            return new JwtSecurityTokenHandler().WriteToken(token);;
        }
    }
}

