using Microsoft.AspNetCore.Identity;

namespace taskflow.Models.Domain;

public class ApplicationUser : IdentityUser
{
    public Guid Id { get; set; }
        
    public string FirstName { get; set; }
    
    public string LastName { get; set; }
    
}