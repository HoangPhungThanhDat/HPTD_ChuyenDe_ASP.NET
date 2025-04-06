using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.Text.Json.Serialization;

namespace _2122110333_HoangPhungThanhDat_ASP.NET.Model
{
    public class Product
    {
        public int ProductId { get; set; }
        public int CategoryId { get; set; }
        public int BrandId { get; set; }

        public string Name { get; set; }
        public string Slug { get; set; }
        public string Content { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public decimal PriceBuy { get; set; }
        public decimal PriceSale { get; set; }
        public int Qty { get; set; } = 0;

        // Thông tin thao tác
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public string CreatedBy { get; set; }

        public DateTime? UpdatedAt { get; set; }
        public string? UpdatedBy { get; set; }

        public DateTime? DeletedAt { get; set; }
        public string? DeletedBy { get; set; }

        public string Status { get; set; }

        // Navigation properties — không cần validate khi POST/PUT
        [ValidateNever]
        [JsonIgnore]
        public virtual Category Category { get; set; }

        // Navigation properties — không cần validate khi POST/PUT
        [ValidateNever]
        [JsonIgnore]
        public virtual Brand Brand { get; set; }
    }

}
