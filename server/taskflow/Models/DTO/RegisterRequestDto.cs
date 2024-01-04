using System.ComponentModel.DataAnnotations;

namespace taskflow.Models.DTO
{
    public class RegisterRequestDto
    {
        [Required]
        [DataType(DataType.Text)]
        public string Firstname { get; set; }
        
        [Required]
        [DataType(DataType.Text)]
        public string Lastname { get; set; }
        
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Username { get; set; }
        
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        
        /*public string[] Roles { get; set; }*/
    }
}

