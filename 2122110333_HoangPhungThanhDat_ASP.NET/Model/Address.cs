using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.Text.Json.Serialization;

namespace _2122110333_HoangPhungThanhDat_ASP.NET.Model
{
    public class Address
    {
        public int AddressId { get; set; }
        public string BuildingName { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public string Pincode { get; set; }

        // Thông tin theo dõi
        public DateTime CreatedAt { get; set; }           // Thời gian tạo
        public DateTime? UpdatedAt { get; set; }          // Thời gian sửa
        public DateTime? DeletedAt { get; set; }          // Thời gian xóa

        public string CreatedBy { get; set; }             // Người thêm
        public string? UpdatedBy { get; set; }            // Người sửa
        public string? DeletedBy { get; set; }            // Người xóa
        // Navigation properties — không cần validate khi POST/PUT
        [ValidateNever]
        [JsonIgnore]
        public virtual ICollection<UserAddress> UserAddresses { get; set; }
    }
}
