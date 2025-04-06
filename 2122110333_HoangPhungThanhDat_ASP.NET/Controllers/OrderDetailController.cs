using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using _2122110333_HoangPhungThanhDat_ASP.NET.Model;
using System.Threading.Tasks;
using System.Linq;
using _2122110333_HoangPhungThanhDat_ASP.NET.Data;

namespace _2122110333_HoangPhungThanhDat_ASP.NET.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderDetailController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OrderDetailController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/OrderDetail
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderDetail>>> GetOrderDetails()
        {
            return await _context.OrderDetails.Include(od => od.Order).Include(od => od.Product).ToListAsync();
        }

        // GET: api/OrderDetail/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDetail>> GetOrderDetail(int id)
        {
            var orderDetail = await _context.OrderDetails
                .Include(od => od.Order)
                .Include(od => od.Product)
                .FirstOrDefaultAsync(od => od.OrderDetailId == id);

            if (orderDetail == null)
            {
                return NotFound();
            }

            return orderDetail;
        }

        // POST: api/OrderDetail
        [HttpPost]
        public async Task<ActionResult<OrderDetail>> PostOrderDetail(OrderDetail orderDetail)
        {
            _context.OrderDetails.Add(orderDetail);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOrderDetail), new { id = orderDetail.OrderDetailId }, orderDetail);
        }

        // PUT: api/OrderDetail/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrderDetail(int id, OrderDetail orderDetail)
        {
            if (id != orderDetail.OrderDetailId)
            {
                return BadRequest();
            }

            _context.Entry(orderDetail).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/OrderDetail/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrderDetail(int id)
        {
            var orderDetail = await _context.OrderDetails.FindAsync(id);
            if (orderDetail == null)
            {
                return NotFound();
            }

            _context.OrderDetails.Remove(orderDetail);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
