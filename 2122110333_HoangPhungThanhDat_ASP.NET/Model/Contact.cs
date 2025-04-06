using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

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
        public virtual User? User { get; set; }

        [ValidateNever]
        [JsonIgnore]
        public virtual Contact? Replay { get; set; }
    }
}
