using System.ComponentModel.DataAnnotations;

namespace taskflow;

public class RegisterDto
{
    [Required]
    public string FirstName { get; set; }
    [Required]
    public string LastName { get; set; }
    [Required]
    [EmailAddress]
    public string Email { get; set; }
    [Required]
    [MinLength(8)]
    public string Password { get; set; }
    [Required]
    [Compare(nameof(Password))]
    public string ConfirmPassword { get; set; }
}
