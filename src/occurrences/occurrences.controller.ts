import { Controller, Post, Get, Body } from '@nestjs/common';
import { OccurrencesService } from './occurrences.service';
import { CreateOccurrenceDto } from './dto/create-occurrence.dto';

@Controller('occurrences')
export class OccurrencesController {
  constructor(private readonly occurrencesService: OccurrencesService) {}

  // Endpoint para listar todas as ocorrências
  @Get()
  async getAllOccurrences() {
    return this.occurrencesService.getAllOccurrences();
  }

  // Endpoint para criar uma nova ocorrência e enviá-la ao Kafka
  @Post('send')
  async createOccurrence(@Body() createOccurrenceDto: CreateOccurrenceDto) {
    return this.occurrencesService.createSaveAndSendToSocketIO(
      createOccurrenceDto,
    );
  }
}
