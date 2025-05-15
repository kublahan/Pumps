
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PumpApi.Models;
using PumpApi.Data;

[Route("api/[controller]")]
[ApiController]
public class PumpsController : ControllerBase
{
    private readonly AppDbContext _context;

    public PumpsController(AppDbContext context)
    {
        _context = context;
    }


    [HttpGet]
    public async Task<ActionResult<IEnumerable<Pump>>> GetPumps()
    {
        return await _context.Pumps
            .Include(p => p.MotorDetails)
            .Include(p => p.HousingMaterialDetails)
            .Include(p => p.WheelMaterialDetails)
            .ToListAsync();
    }


    [HttpGet("{id}")]
    public async Task<ActionResult<Pump>> GetPump(int id)
    {
        var pump = await _context.Pumps
            .Include(p => p.MotorDetails)
            .Include(p => p.HousingMaterialDetails)
            .Include(p => p.WheelMaterialDetails)
            .FirstOrDefaultAsync(p => p.PumpId == id);

        if (pump == null)
        {
            return NotFound();
        }
        return pump;
    }


    [HttpPost]
    public async Task<ActionResult<Pump>> PostPump(Pump pump)
    {
        _context.Pumps.Add(pump);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetPump), new { id = pump.PumpId }, pump);
    }


    [HttpPut("{id}")]
    public async Task<IActionResult> PutPump(int id, Pump pump)
    {
        if (id != pump.PumpId)
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
            if (!_context.Pumps.Any(e => e.PumpId == id))
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