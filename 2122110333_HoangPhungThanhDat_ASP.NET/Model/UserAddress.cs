using System;
using System.ComponentModel.DataAnnotations;

namespace _2122110333_HoangPhungThanhDat_ASP.NET.Model
{
    public class UserAddress
    {
        [Required]
        public int UserId { get; set; }

        [Required]
        public int AddressId { get; set; }

        // Thông tin thao tác
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        [Required]
        public string CreatedBy { get; set; }

        public DateTime? UpdatedAt { get; set; }
        public string? UpdatedBy { get; set; }

        public DateTime? DeletedAt { get; set; }
        public string? DeletedBy { get; set; }

        // Quan hệ với User và Address
        public virtual User? User { get; set; } // ✅ Cho phép null
        public virtual Address Address { get; set; } // Không null
    }
}
