using Microsoft.AspNetCore.Mvc;
using _2122110333_HoangPhungThanhDat_ASP.NET.Model;
using _2122110333_HoangPhungThanhDat_ASP.NET.Data;
using Microsoft.EntityFrameworkCore;

namespace _2122110333_HoangPhungThanhDat_ASP.NET.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BrandController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Brand
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var brands = await _context.Brands.ToListAsync();
            return Ok(brands);
        }

        // GET: api/Brand/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var brand = await _context.Brands.FindAsync(id);

            if (brand == null)
                return NotFound(new { message = "Brand không tồn tại." });

            return Ok(brand);
        }

        // POST: api/Brand
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Brand brand)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Thêm brand vào database
            _context.Brands.Add(brand);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = brand.BrandId }, brand);
        }

        // PUT: api/Brand/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Brand updatedBrand)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var brand = await _context.Brands.FindAsync(id);
            if (brand == null)
                return NotFound(new { message = "Brand không tồn tại." });

            // Cập nhật thông tin của brand
            brand.Name = updatedBrand.Name;
            brand.Slug = updatedBrand.Slug;
            brand.SortOrder = updatedBrand.SortOrder;
            brand.Image = updatedBrand.Image;
            brand.Description = updatedBrand.Description;
            brand.Status = updatedBrand.Status;
            brand.UpdatedAt = DateTime.Now;
            brand.UpdatedBy = updatedBrand.UpdatedBy;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/Brand/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var brand = await _context.Brands.FindAsync(id);
            if (brand == null)
                return NotFound(new { message = "Brand không tồn tại." });

            // Xóa brand
            _context.Brands.Remove(brand);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
