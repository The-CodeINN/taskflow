using taskflow.Models.Domain;
using taskflow.Services.Interfaces;

namespace taskflow.Services.Impls;

public class ApplicationUserService : IApplicationUserService
{
    public Task<ApplicationUser> findOne()
    {
        throw new NotImplementedException();
    }
}