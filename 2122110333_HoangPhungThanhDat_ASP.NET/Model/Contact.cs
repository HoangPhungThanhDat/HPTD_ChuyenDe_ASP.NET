namespace _2122110333_HoangPhungThanhDat_ASP.NET.Model
{
    public class Contact
    {
        public int ContactId { get; set; }
        public int? UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public int? ReplayId { get; set; }

        // Thông tin thời gian và người thao tác
        public DateTime CreatedAt { get; set; } = DateTime.Now;  // Thời gian tạo
        public string CreatedBy { get; set; }                    // Người thêm

        public DateTime? UpdatedAt { get; set; }                 // Thời gian sửa
        public string? UpdatedBy { get; set; }                   // Người sửa

        public DateTime? DeletedAt { get; set; }                 // Thời gian xóa
        public string? DeletedBy { get; set; }                   // Người xóa

        public string Status { get; set; }

        public virtual User User { get; set; }
        public virtual Contact Replay { get; set; }
    }
}
