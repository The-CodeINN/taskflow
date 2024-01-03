namespace taskflow;

public class UserDto
{
    public Guid Id { get; set; }
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public string Email { get; set; } = null!;
    public Role Role { get; set; } = Role.User;
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
