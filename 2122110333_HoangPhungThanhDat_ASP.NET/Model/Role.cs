using System.Text.Json.Serialization; // Thêm namespace này để dùng [JsonIgnore]

namespace _2122110333_HoangPhungThanhDat_ASP.NET.Model
{
    public class Role
    {
        public int RoleId { get; set; }
        public string RoleName { get; set; }

        // Thông tin thao tác
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public string CreatedBy { get; set; }

        public DateTime? UpdatedAt { get; set; }
        public string? UpdatedBy { get; set; }

        public DateTime? DeletedAt { get; set; }
        public string? DeletedBy { get; set; }

        // Ẩn UserRoles khi serialize JSON để tránh lỗi API yêu cầu UserRoles[]
        [JsonIgnore]
        public virtual ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
    }
}
