
using Microsoft.EntityFrameworkCore;

namespace taskflow.Data
{
    public class TaskFlowDbContext : DbContext
    {

        public TaskFlowDbContext(DbContextOptions<TaskFlowDbContext> dbContextOptions) : base(dbContextOptions) {}

        // Create properties based on the available entities
        /*public DbSet<User> Users { get; set; }*/
        
    }
}

