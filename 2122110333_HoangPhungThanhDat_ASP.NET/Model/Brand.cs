namespace _2122110333_HoangPhungThanhDat_ASP.NET.Model
{
    public class Brand
    {
        public int BrandId { get; set; }
        public string Name { get; set; }
        public string Slug { get; set; }
        public int SortOrder { get; set; } = 0;
        public string Image { get; set; }
        public string Description { get; set; }

        // Các thông tin về người thao tác và thời gian
        public DateTime CreatedAt { get; set; } = DateTime.Now;  // Thời gian tạo
        public string CreatedBy { get; set; }                    // Người tạo

        public DateTime? UpdatedAt { get; set; }                 // Thời gian sửa
        public string? UpdatedBy { get; set; }                   // Người sửa

        public DateTime? DeletedAt { get; set; }                 // Thời gian xóa
        public string? DeletedBy { get; set; }                   // Người xóa

        public string Status { get; set; }
    }
}
