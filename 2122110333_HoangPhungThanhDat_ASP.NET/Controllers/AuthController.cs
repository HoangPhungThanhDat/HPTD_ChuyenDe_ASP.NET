using _2122110333_HoangPhungThanhDat_ASP.NET.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace _2122110333_HoangPhungThanhDat_ASP.NET.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;

        // Danh sách người dùng tạm thời (chỉ để demo, không nên dùng cho sản phẩm thật)
        private static List<LoginModel> _users = new List<LoginModel>();

        public AuthController(IConfiguration config)
        {
            _config = config;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel login)
        {
            var user = _users.FirstOrDefault(u => u.Email == login.Email && u.Password == login.Password);
            if (user != null)
            {
                var token = GenerateJwtToken(login.Email);
                return Ok(new { token });
            }

            return Unauthorized("Email hoặc mật khẩu không đúng!");
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] LoginModel register)
        {
            var existingUser = _users.FirstOrDefault(u => u.Email == register.Email);
            if (existingUser != null)
            {
                return BadRequest("Email đã được sử dụng!");
            }

            _users.Add(register);
            return Ok("Đăng ký thành công!");
        }

        private string GenerateJwtToken(string email)
        {
            var key = _config["Jwt:Key"];
            var issuer = _config["Jwt:Issuer"];

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.Email, email),
                new Claim(ClaimTypes.Role, "User") // Bạn có thể điều chỉnh role nếu cần
            };

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: null,
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

    public class LoginModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
