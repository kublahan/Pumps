
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
            .FirstOrDefaultAsync(p => p.Id == id);

        if (pump == null)
        {
            return NotFound();
        }
        return pump;
    }


    [HttpPost]
    public async Task<ActionResult<Pump>> PostPump([FromBody] PumpDto pumpDto)
    {
        if (!int.TryParse(pumpDto.MotorForeignKey, out int motorForeignKey))
        {
            return BadRequest("Invalid MotorForeignKey");
        }

        if (!int.TryParse(pumpDto.HousingMaterialForeignKey, out int housingMaterialForeignKey))
        {
            return BadRequest("Invalid HousingMaterialForeignKey");
        }

        if (!int.TryParse(pumpDto.WheelMaterialForeignKey, out int wheelMaterialForeignKey))
        {
            return BadRequest("Invalid WheelMaterialForeignKey");
        }

        var pump = new Pump
        {
            PumpName = pumpDto.PumpName,
            MaxPressure = pumpDto.MaxPressure ?? 0,
            LiquidTemperatureCelsius = pumpDto.LiquidTemperatureCelsius ?? 0,
            WeightInKilograms = pumpDto.WeightInKilograms ?? 0,
            PumpDescription = pumpDto.PumpDescription,
            ImageUrlPath = pumpDto.ImageUrlPath,
            PriceInRubles = pumpDto.PriceInRubles,
            MotorForeignKey = motorForeignKey,
            HousingMaterialForeignKey = housingMaterialForeignKey,
            WheelMaterialForeignKey = wheelMaterialForeignKey

        };

        _context.Pumps.Add(pump);
        await _context.SaveChangesAsync();


        var createdPump = await _context.Pumps
            .Include(p => p.MotorDetails)
            .Include(p => p.HousingMaterialDetails)
            .Include(p => p.WheelMaterialDetails)
            .FirstOrDefaultAsync(p => p.Id == pump.Id);

        return CreatedAtAction(nameof(GetPump), new { id = createdPump.Id }, createdPump);
    }


    [HttpPut("{id}")]
    public async Task<IActionResult> PutPump(int id, [FromBody] UpdatePumpDto pumpDto)
    {
        if (id != pumpDto.Id)
        {
            return BadRequest();
        }

        var pump = await _context.Pumps.FindAsync(id);
        if (pump == null)
        {
            return NotFound();
        }

        pump.PumpName = pumpDto.PumpName;
        pump.MaxPressure = pumpDto.MaxPressure ?? pump.MaxPressure;
        pump.LiquidTemperatureCelsius = pumpDto.LiquidTemperatureCelsius ?? pump.LiquidTemperatureCelsius;
        pump.WeightInKilograms = pumpDto.WeightInKilograms ?? pump.WeightInKilograms;
        pump.PumpDescription = pumpDto.PumpDescription ?? pump.PumpDescription;
        pump.ImageUrlPath = pumpDto.ImageUrlPath ?? pump.ImageUrlPath;
        pump.PriceInRubles = pumpDto.PriceInRubles;
        pump.MotorForeignKey = pumpDto.MotorForeignKey;
        pump.HousingMaterialForeignKey = pumpDto.HousingMaterialForeignKey;
        pump.WheelMaterialForeignKey = pumpDto.WheelMaterialForeignKey;

        _context.Entry(pump).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.Pumps.Any(e => e.Id == id))
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