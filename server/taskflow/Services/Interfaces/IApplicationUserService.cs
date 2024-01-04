using taskflow.Models.Domain;

namespace taskflow.Services.Interfaces;

public interface IApplicationUserService
{
    public  Task<ApplicationUser> findOne();
}