using Microsoft.EntityFrameworkCore;
using taskflow.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();


// Inject TaskFlowDbContext into the app
builder.Services.AddDbContext<TaskFlowDbContext>(options => 
        options.UseSqlServer(builder.Configuration.GetConnectionString("TaskFlowConnectionString"))
    );

builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

app.UseAuthorization();

app.MapControllers();

app.Run();
