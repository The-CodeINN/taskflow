using System.ComponentModel.DataAnnotations;

namespace taskflow.Models.DTO.Request
{
    public class LoginRequestDto
    {
        [Required]
        [EmailAddress]
        [DataType(DataType.EmailAddress)]
        public string Username { get; set; }
        
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}

