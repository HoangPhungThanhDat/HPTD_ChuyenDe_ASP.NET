using System.Text.Json.Serialization; // Thêm namespace này để dùng [JsonIgnore]

namespace _2122110333_HoangPhungThanhDat_ASP.NET.Model
{
    public class User
    {
        public int UserId { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MobileNumber { get; set; }
        public string Password { get; set; }
        public bool Status { get; set; } = true;

        // Thông tin thao tác
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public string CreatedBy { get; set; }

        public DateTime? UpdatedAt { get; set; }
        public string? UpdatedBy { get; set; }

        public DateTime? DeletedAt { get; set; }
        public string? DeletedBy { get; set; }

        // Quan hệ với UserRole (Ẩn khi trả về JSON để tránh lỗi vòng lặp)
        [JsonIgnore]
        public virtual ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();

        // Quan hệ với UserAddress (Ẩn khi trả về JSON để tránh lỗi vòng lặp)
        [JsonIgnore]
        public virtual ICollection<UserAddress> UserAddresses { get; set; } = new List<UserAddress>();
    }
}
