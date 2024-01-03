namespace taskflow;

public class UserDto
{
    public Guid Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string ImageUrl { get; set; }
    public Role Role { get; set; } = Role.User;
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
