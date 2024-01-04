using System.ComponentModel.DataAnnotations;

namespace taskflow.Models.DTO.Request
{
    public class RegisterRequestDto
    {
        [Required]
        [DataType(DataType.Text)]
        [MaxLength(255, ErrorMessage = "Only Max of 255 characters is allowed")]
        public string Firstname { get; set; }
        
        [Required]
        [DataType(DataType.Text)]
        [MaxLength(255, ErrorMessage = "Only Max of 255 characters is allowed")]
        public string Lastname { get; set; }
        
        [Required]
        [EmailAddress]
        [DataType(DataType.EmailAddress)]
        [MaxLength(255, ErrorMessage = "Only Max of 255 characters is allowed")]
        public string Username { get; set; }
        
        [Required]
        [DataType(DataType.Password)]
        [MaxLength(255, ErrorMessage = "Only Max of 255 characters is allowed")]
        public string Password { get; set; }
        
        /*public string[] Roles { get; set; }*/
    }
}

