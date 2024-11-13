import { IsNotEmpty, IsString, IsObject, IsNumber } from 'class-validator';

export class Coordinates {
  @IsNotEmpty()
  @IsNumber()
  lat: number;  // Latitude da ocorrência

  @IsNotEmpty()
  @IsNumber()
  lng: number;  // Longitude da ocorrência
}

export class CreateOccurrenceDto {
  
  @IsNotEmpty()
  @IsString()
  type: string;  // Tipo da ocorrência (ex.: obras, acidente, etc.)

  @IsNotEmpty()
  @IsObject()
  coordinates: Coordinates;
}