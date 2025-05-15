using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PumpApi.Data;
using PumpApi.Models;

[ApiController]
[Route("api/[controller]")]
public class MotorsController : ControllerBase
{
    private readonly AppDbContext _context;

    public MotorsController(AppDbContext context)
    {
        _context = context;
    }


    [HttpGet]
    public async Task<ActionResult<IEnumerable<Motor>>> GetMotors()
    {
        return await _context.Motors.ToListAsync();
    }


    [HttpGet("{id}")]
    public async Task<ActionResult<Motor>> GetMotor(int id)
    {
        var motor = await _context.Motors.FindAsync(id);
        if (motor == null) return NotFound();
        return motor;
    }


    [HttpPost]
    public async Task<ActionResult<Motor>> CreateMotor(Motor motor)
    {
        _context.Motors.Add(motor);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetMotor), new { id = motor.Id }, motor);
    }


    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateMotor(int id, Motor motor)
    {
        if (id != motor.Id) return BadRequest();
        _context.Entry(motor).State = EntityState.Modified;
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!MotorExists(id)) return NotFound();
            throw;
        }
        return NoContent();
    }


    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMotor(int id)
    {
        var motor = await _context.Motors.FindAsync(id);
        if (motor == null) return NotFound();
        _context.Motors.Remove(motor);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    private bool MotorExists(int id)
    {
        return _context.Motors.Any(e => e.Id == id);
    }
}