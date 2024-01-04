using Microsoft.AspNetCore.Identity;

namespace taskflow.Repositories.Interfaces
{
    public interface ITokenRepository
    {
        string CreateJwtToken(IdentityUser user);
    }
}

