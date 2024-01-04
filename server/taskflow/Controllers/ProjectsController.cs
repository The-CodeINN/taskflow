using Microsoft.AspNetCore.Mvc;

namespace taskflow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok("Hello world!");
        }
        
        
    }
}
