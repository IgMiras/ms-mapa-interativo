import {
  IsNotEmpty,
  IsObject,
  IsNumber,
  IsEnum,
  IsString,
} from 'class-validator';

export class Coordinates {
  @IsNotEmpty()
  @IsNumber()
  lat: number; // Latitude da ocorrência

  @IsNotEmpty()
  @IsNumber()
  lng: number; // Longitude da ocorrência
}

export enum OccurrenceType {
  CONSTRUCTION = 'construction',
  ACCIDENT = 'accident',
  CHECKPOINT = 'checkpoint',
  FIRE = 'fire',
  PROTEST = 'protest',
  NOWATER = 'nowater',
  NOPOWER = 'nopower',
  THEFT = 'theft',
}

export class CreateOccurrenceDto {
  @IsNotEmpty()
  @IsEnum(OccurrenceType)
  type: OccurrenceType; // Tipo da ocorrência (ex.: obras, acidente, etc.)

  @IsNotEmpty()
  @IsObject()
  coordinates: Coordinates;

  @IsString()
  description: string; // Descrição da ocorrência
}
