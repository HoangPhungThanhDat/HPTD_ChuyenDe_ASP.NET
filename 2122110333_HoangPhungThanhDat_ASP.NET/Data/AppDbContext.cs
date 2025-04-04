using _2122110333_HoangPhungThanhDat_ASP.NET.Model;
using Microsoft.EntityFrameworkCore;

namespace _2122110333_HoangPhungThanhDat_ASP.NET.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Category> Categories { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<UserAddress> UserAddresses { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Cấu hình khóa chính cho bảng UserRole (khóa chính kết hợp giữa UserId và RoleId)
            modelBuilder.Entity<UserRole>()
                .HasKey(ur => new { ur.UserId, ur.RoleId });

            // Cấu hình khóa chính cho bảng UserAddress (khóa chính kết hợp giữa UserId và AddressId)
            modelBuilder.Entity<UserAddress>()
                .HasKey(ua => new { ua.UserId, ua.AddressId });

            // Cấu hình mối quan hệ giữa các bảng với nhau (User - UserRole, Product - Category, Product - Brand, v.v.)
            modelBuilder.Entity<UserRole>()
                .HasOne(ur => ur.User)
                .WithMany(u => u.UserRoles)
                .HasForeignKey(ur => ur.UserId)
                .OnDelete(DeleteBehavior.Cascade);  // Thêm cấu hình xóa cascade

            modelBuilder.Entity<UserRole>()
                .HasOne(ur => ur.Role)
                .WithMany(r => r.UserRoles)
                .HasForeignKey(ur => ur.RoleId)
                .OnDelete(DeleteBehavior.Cascade);  // Thêm cấu hình xóa cascade

            modelBuilder.Entity<UserAddress>()
                .HasOne(ua => ua.User)
                .WithMany(u => u.UserAddresses)
                .HasForeignKey(ua => ua.UserId)
                .OnDelete(DeleteBehavior.Cascade);  // Thêm cấu hình xóa cascade

            modelBuilder.Entity<UserAddress>()
             .HasOne(ua => ua.Address)
             .WithMany(a => a.UserAddresses)  // Đảm bảo Address có thuộc tính UserAddresses
             .HasForeignKey(ua => ua.AddressId)
             .OnDelete(DeleteBehavior.Cascade);  // Đảm bảo xóa cascade nếu cần


            // Cấu hình Soft Delete (lọc các bản ghi đã xóa)
            modelBuilder.Entity<Category>()
                .HasQueryFilter(c => c.DeletedAt == null);
            modelBuilder.Entity<Brand>()
                .HasQueryFilter(b => b.DeletedAt == null);
            modelBuilder.Entity<Product>()
                .HasQueryFilter(p => p.DeletedAt == null);
            modelBuilder.Entity<User>()
                .HasQueryFilter(u => u.DeletedAt == null);
            modelBuilder.Entity<Order>()
                .HasQueryFilter(o => o.DeletedAt == null);
            modelBuilder.Entity<OrderDetail>()
                .HasQueryFilter(od => od.DeletedAt == null);
            modelBuilder.Entity<Contact>()
                .HasQueryFilter(c => c.DeletedAt == null);
            modelBuilder.Entity<Address>()
                .HasQueryFilter(a => a.DeletedAt == null);
            modelBuilder.Entity<UserAddress>()
                .HasQueryFilter(ua => ua.DeletedAt == null);
            modelBuilder.Entity<UserRole>()
                .HasQueryFilter(ur => ur.DeletedAt == null);

            base.OnModelCreating(modelBuilder);
        }
    }
}
