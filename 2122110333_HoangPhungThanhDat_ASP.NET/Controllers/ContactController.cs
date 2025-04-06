using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using _2122110333_HoangPhungThanhDat_ASP.NET.Model;
using _2122110333_HoangPhungThanhDat_ASP.NET.Data;

namespace _2122110333_HoangPhungThanhDat_ASP.NET.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ContactController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/contacts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contact>>> GetContacts()
        {
            return await _context.Contacts
                .Include(c => c.User)
                .Include(c => c.Replay)
                .ToListAsync();
        }

        // GET: api/contacts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Contact>> GetContact(int id)
        {
            var contact = await _context.Contacts
                .Include(c => c.User)
                .Include(c => c.Replay)
                .FirstOrDefaultAsync(c => c.ContactId == id);

            if (contact == null)
            {
                return NotFound();
            }

            return contact;
        }

        // POST: api/contacts
        [HttpPost]
        public async Task<ActionResult<Contact>> PostContact(Contact contact)
        {
            contact.CreatedAt = DateTime.Now;
            _context.Contacts.Add(contact);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetContact), new { id = contact.ContactId }, contact);
        }

        // PUT: api/contacts/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutContact(int id, Contact contact)
        {
            if (id != contact.ContactId)
            {
                return BadRequest();
            }

            contact.UpdatedAt = DateTime.Now;
            _context.Entry(contact).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContactExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/contacts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(int id)
        {
            var contact = await _context.Contacts.FindAsync(id);
            if (contact == null)
            {
                return NotFound();
            }

            _context.Contacts.Remove(contact);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ContactExists(int id)
        {
            return _context.Contacts.Any(e => e.ContactId == id);
        }
    }
}
