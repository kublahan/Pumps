export interface UpdatePumpDto {
  Id: number;
  PumpName: string;
  MaxPressure: number | null;
  LiquidTemperatureCelsius: number | null;
  WeightInKilograms: number | null;
  PumpDescription: string;
  ImageUrlPath: string;
  PriceInRubles: number;
  MotorForeignKey: number;
  HousingMaterialForeignKey: number;
  WheelMaterialForeignKey: number;
}