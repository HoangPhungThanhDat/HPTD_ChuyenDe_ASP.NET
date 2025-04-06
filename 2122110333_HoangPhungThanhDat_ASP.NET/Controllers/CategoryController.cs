using Microsoft.AspNetCore.Mvc;
using _2122110333_HoangPhungThanhDat_ASP.NET.Model;
using _2122110333_HoangPhungThanhDat_ASP.NET.Data;
using Microsoft.EntityFrameworkCore;

namespace _2122110333_HoangPhungThanhDat_ASP.NET.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CategoryController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Category
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var categories = await _context.Categories
                                          .Include(c => c.Parent)
                                          .Include(c => c.Children)
                                          .ToListAsync();
            return Ok(categories);
        }

        // GET: api/Category/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var category = await _context.Categories
                                         .Include(c => c.Parent)
                                         .Include(c => c.Children)
                                         .FirstOrDefaultAsync(c => c.CategoryId == id);

            if (category == null)
                return NotFound(new { message = "Category không tồn tại." });

            return Ok(category);
        }

        // POST: api/Category
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Category category)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Kiểm tra nếu slug đã tồn tại trong hệ thống
            var existingCategory = await _context.Categories
                                                 .FirstOrDefaultAsync(c => c.Slug == category.Slug);
            if (existingCategory != null)
                return Conflict(new { message = "Slug đã tồn tại." });

            // Thêm mới category vào database
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = category.CategoryId }, category);
        }

        // PUT: api/Category/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Category updatedCategory)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var category = await _context.Categories.FindAsync(id);
            if (category == null)
                return NotFound(new { message = "Category không tồn tại." });

            // Cập nhật thông tin category
            category.Name = updatedCategory.Name;
            category.Slug = updatedCategory.Slug;
            category.ParentId = updatedCategory.ParentId;
            category.SortOrder = updatedCategory.SortOrder;
            category.Image = updatedCategory.Image;
            category.Description = updatedCategory.Description;
            category.Status = updatedCategory.Status;
            category.UpdatedAt = DateTime.Now;
            category.UpdatedBy = updatedCategory.UpdatedBy ?? "Admin"; // Nếu không có người sửa, mặc định là "Admin"

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/Category/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
                return NotFound(new { message = "Category không tồn tại." });

            // Xóa category
            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
