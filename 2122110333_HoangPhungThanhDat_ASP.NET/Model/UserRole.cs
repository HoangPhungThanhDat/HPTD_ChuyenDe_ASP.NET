namespace _2122110333_HoangPhungThanhDat_ASP.NET.Model
{
    public class UserRole
    {
        public int UserId { get; set; }
        public int RoleId { get; set; }

        // Thông tin thao tác
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public string CreatedBy { get; set; }

        public DateTime? UpdatedAt { get; set; }
        public string? UpdatedBy { get; set; }

        public DateTime? DeletedAt { get; set; }
        public string? DeletedBy { get; set; }

        public virtual User? User { get; set; }
        public virtual Role? Role { get; set; }
    }
}
