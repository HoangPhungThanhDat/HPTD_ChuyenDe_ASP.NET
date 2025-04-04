using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;

namespace _2122110333_HoangPhungThanhDat_ASP.NET.Data
{
    public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
    {
        public AppDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();

            // Tạo configuration builder để đọc appsettings.json
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())  // Đảm bảo đường dẫn đúng
                .AddJsonFile("appsettings.json")               // Đọc file cấu hình
                .Build();

            // Sử dụng connection string từ appsettings.json
            optionsBuilder.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));

            return new AppDbContext(optionsBuilder.Options);  // Trả về DbContext đã cấu hình
        }
    }
}
