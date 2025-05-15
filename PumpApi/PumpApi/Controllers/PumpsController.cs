// Controllers/PumpsController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PumpApi.Models;
using PumpApi.Data; // Ваш DbContext

[Route("api/[controller]")]
[ApiController]
public class PumpsController : ControllerBase
{
    private readonly AppDbContext _context;

    public PumpsController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/Pumps
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Pump>>> GetPumps()
    {
        return await _context.Pumps
            .Include(p => p.MotorDetails) // Используем MotorDetails
            .Include(p => p.HousingMaterialDetails) // Используем HousingMaterialDetails
            .Include(p => p.WheelMaterialDetails) // Используем WheelMaterialDetails
            .ToListAsync();
    }

    // GET: api/Pumps/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Pump>> GetPump(int id)
    {
        var pump = await _context.Pumps
            .Include(p => p.MotorDetails) // Используем MotorDetails
            .Include(p => p.HousingMaterialDetails) // Используем HousingMaterialDetails
            .Include(p => p.WheelMaterialDetails) // Используем WheelMaterialDetails
            .FirstOrDefaultAsync(p => p.PumpId == id); // Используем PumpId

        if (pump == null)
        {
            return NotFound();
        }
        return pump;
    }

    // POST: api/Pumps
    [HttpPost]
    public async Task<ActionResult<Pump>> PostPump(Pump pump)
    {
        _context.Pumps.Add(pump);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetPump), new { id = pump.PumpId }, pump); // Используем PumpId
    }

    // PUT: api/Pumps/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutPump(int id, Pump pump)
    {
        if (id != pump.PumpId) // Используем PumpId
        {
            return BadRequest();
        }
        _context.Entry(pump).State = EntityState.Modified;
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.Pumps.Any(e => e.PumpId == id)) // Используем PumpId
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

    // DELETE: api/Pumps/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePump(int id)
    {
        var pump = await _context.Pumps.FindAsync(id);
        if (pump == null)
        {
            return NotFound();
        }
        _context.Pumps.Remove(pump);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}