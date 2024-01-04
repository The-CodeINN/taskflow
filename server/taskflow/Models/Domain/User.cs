using Microsoft.AspNetCore.Identity;

namespace taskflow.Models.Domain;

public class User : IdentityUser
{
    public Guid Id { get; set; }
        
    public required string FirstName { get; set; }
    
    public required string LastName { get; set; }
    
}