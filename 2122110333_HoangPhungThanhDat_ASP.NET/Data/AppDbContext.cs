using _2122110333_HoangPhungThanhDat_ASP.NET.Model;
using Microsoft.EntityFrameworkCore;

namespace _2122110333_HoangPhungThanhDat_ASP.NET.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Product> Products { get; set; }
    }
}
