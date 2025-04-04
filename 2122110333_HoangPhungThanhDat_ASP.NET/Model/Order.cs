namespace _2122110333_HoangPhungThanhDat_ASP.NET.Model
{
    public class Order
    {
        public int OrderId { get; set; }
        public int UserId { get; set; }
        public string DeliveryName { get; set; }
        public string DeliveryGender { get; set; }
        public string DeliveryEmail { get; set; }
        public string DeliveryPhone { get; set; }
        public string DeliveryAddress { get; set; }
        public string Note { get; set; }

        // Thông tin thời gian và người thao tác
        public DateTime CreatedAt { get; set; } = DateTime.Now;  // Thời gian tạo
        public string CreatedBy { get; set; }                    // Người tạo

        public DateTime? UpdatedAt { get; set; }                 // Thời gian sửa
        public string? UpdatedBy { get; set; }                   // Người sửa

        public DateTime? DeletedAt { get; set; }                 // Thời gian xóa
        public string? DeletedBy { get; set; }                   // Người xóa

        public string Type { get; set; }
        public string Status { get; set; }

        public virtual User User { get; set; }
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
    }
}
