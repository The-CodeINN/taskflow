
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using taskflow.Models.Domain;

namespace taskflow.Data
{
    public class TaskFlowDbContext : IdentityDbContext<ApplicationUser>
    {

        public TaskFlowDbContext(DbContextOptions<TaskFlowDbContext> dbContextOptions) : base(dbContextOptions) {}

        // Create properties based on the available entities
        /*public DbSet<User> Users { get; set; }*/
        
    }
}

