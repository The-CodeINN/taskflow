
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using taskflow.Models.Domain;

namespace taskflow.Data
{
    public class TaskFlowAuthDbContext : IdentityDbContext<User>
    {

        public TaskFlowAuthDbContext(DbContextOptions<TaskFlowAuthDbContext> dbContextOptions) : base(dbContextOptions) {}

        // Create properties based on the available entities
        /*public DbSet<User> Users { get; set; }*/
        
    }
}

