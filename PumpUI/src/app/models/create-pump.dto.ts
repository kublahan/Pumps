export interface PumpCreateDto {
  pumpName: string;
  maxPressure: number | null;
  liquidTemperatureCelsius: number | null;
  weightInKilograms: number | null;
  pumpDescription: string | null;
  imageUrlPath: string | null;
  priceInRubles: number;
  motorForeignKey: string;
  housingMaterialForeignKey: string;
  wheelMaterialForeignKey: string;
}