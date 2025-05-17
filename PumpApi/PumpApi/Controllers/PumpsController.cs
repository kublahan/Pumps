using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PumpApi.Data;
using PumpApi.Models;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Drawing;
using System.Drawing.Imaging;

[Route("api/[controller]")]
[ApiController]
public class PumpsController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IWebHostEnvironment _environment;

    public PumpsController(AppDbContext context, IWebHostEnvironment environment)
    {
        _context = context;
        _environment = environment;
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
    public async Task<ActionResult<Pump>> PostPump([FromForm] PumpWithImageDto pumpWithImageDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        if (!int.TryParse(pumpWithImageDto.MotorForeignKey, out int motorForeignKey))
        {
            return BadRequest("Invalid MotorForeignKey");
        }

        if (!int.TryParse(pumpWithImageDto.HousingMaterialForeignKey, out int housingMaterialForeignKey))
        {
            return BadRequest("Invalid HousingMaterialForeignKey");
        }

        if (!int.TryParse(pumpWithImageDto.WheelMaterialForeignKey, out int wheelMaterialForeignKey))
        {
            return BadRequest("Invalid WheelMaterialForeignKey");
        }

        byte[] imageData = null;
        if (pumpWithImageDto.ImageFile != null && pumpWithImageDto.ImageFile.Length > 0)
        {
            try
            {
                using (var memoryStream = new MemoryStream())
                {
                    await pumpWithImageDto.ImageFile.CopyToAsync(memoryStream);
                    using (var image = Image.FromStream(memoryStream))
                    {
                        using (var jpegMemoryStream = new MemoryStream())
                        {
                            image.Save(jpegMemoryStream, ImageFormat.Jpeg);
                            imageData = jpegMemoryStream.ToArray();
                            
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                
                return BadRequest("Ошибка при обработке изображения.");
            }
        }


        var pump = new Pump
        {
            PumpName = pumpWithImageDto.PumpName,
            MaxPressure = pumpWithImageDto.MaxPressure ?? 0,
            LiquidTemperatureCelsius = pumpWithImageDto.LiquidTemperatureCelsius ?? 0,
            WeightInKilograms = pumpWithImageDto.WeightInKilograms ?? 0,
            PumpDescription = pumpWithImageDto.PumpDescription,
            ImageUrlPath = imageData,
            PriceInRubles = pumpWithImageDto.PriceInRubles,
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
    public async Task<IActionResult> PutPump(int id, [FromForm] PumpWithImageDto pumpWithImageDto)
    {
        if (id != pumpWithImageDto.Id)
        {
            return BadRequest();
        }

        var pump = await _context.Pumps.FindAsync(id);
        if (pump == null)
        {
            return NotFound();
        }

        if (!int.TryParse(pumpWithImageDto.MotorForeignKey, out int motorId))
        {
            return BadRequest("Invalid MotorForeignKey");
        }
        if (!int.TryParse(pumpWithImageDto.HousingMaterialForeignKey, out int housingMaterialId))
        {
            return BadRequest("Invalid HousingMaterialForeignKey");
        }
        if (!int.TryParse(pumpWithImageDto.WheelMaterialForeignKey, out int wheelMaterialId))
        {
            return BadRequest("Invalid WheelMaterialForeignKey");
        }

        // Проверяем, был ли предоставлен новый файл изображения
        if (pumpWithImageDto.ImageFile != null && pumpWithImageDto.ImageFile.Length > 0)
        {
            byte[] imageData = null;
            try
            {
                using (var memoryStream = new MemoryStream())
                {
                    await pumpWithImageDto.ImageFile.CopyToAsync(memoryStream);
                    using (var image = Image.FromStream(memoryStream))
                    {
                        using (var jpegMemoryStream = new MemoryStream())
                        {
                            image.Save(jpegMemoryStream, ImageFormat.Jpeg);
                            imageData = jpegMemoryStream.ToArray();
                            Console.WriteLine($"[БЭКЕНД - PUT] Новое изображение преобразовано в JPEG, размер: {imageData?.Length} байт");
                            pump.ImageUrlPath = imageData; // Обновляем бинарные данные новым изображением
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[БЭКЕНД - PUT] Ошибка при обработке нового изображения: {ex.Message}");
                return BadRequest("Ошибка при обработке нового изображения.");
            }
        }
        else
        {
            Console.WriteLine("[БЭКЕНД - PUT] Новый файл изображения не был предоставлен. Сохраняем старое изображение.");
            // Ничего не делаем с pump.ImageUrlPath, чтобы сохранить старое значение
        }

        pump.PumpName = pumpWithImageDto.PumpName ?? pump.PumpName;
        pump.MaxPressure = pumpWithImageDto.MaxPressure ?? pump.MaxPressure;
        pump.LiquidTemperatureCelsius = pumpWithImageDto.LiquidTemperatureCelsius ?? pump.LiquidTemperatureCelsius;
        pump.WeightInKilograms = pumpWithImageDto.WeightInKilograms ?? pump.WeightInKilograms;
        pump.PumpDescription = pumpWithImageDto.PumpDescription ?? pumpWithImageDto.PumpDescription;
        pump.PriceInRubles = pumpWithImageDto.PriceInRubles;
        pump.MotorForeignKey = motorId;
        pump.HousingMaterialForeignKey = housingMaterialId;
        pump.WheelMaterialForeignKey = wheelMaterialId;

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