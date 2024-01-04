using Microsoft.AspNetCore.Identity;

namespace taskflow.Repositories
{
    public interface ITokenRepository
    {
        string CreateJWTToken(IdentityUser user);
    }
}

