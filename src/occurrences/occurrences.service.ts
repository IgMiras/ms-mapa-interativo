import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Occurrence } from './entities/occurrence.entity';
import { CreateOccurrenceDto } from './dto/create-occurrence.dto';
import { SocketGateway } from 'src/socket/socket.gateway';

@Injectable()
export class OccurrencesService {
  constructor(
    @InjectRepository(Occurrence)
    private occurrencesRepository: Repository<Occurrence>,
    private readonly socketGateway: SocketGateway,
  ) {}

  async createSaveAndSendToSocketIO(createOccurrenceDto: CreateOccurrenceDto) {
    try {
      // Salva a ocorrência no banco de dados PostgreSQL
      const occurrence = this.occurrencesRepository.create(createOccurrenceDto);
      await this.occurrencesRepository.save(occurrence);

      // Envia a ocorrência para o Socket.IO
      this.socketGateway.broadcastNewOccurrence(occurrence);

      return occurrence;
      
    } catch (error) {
      console.error('Error creating, saving, or broadcasting occurrence:', error);
      throw new Error('Failed to create, save, or broadcast occurrence');
    }
  }

  async getAllOccurrences(): Promise<Occurrence[]> {
    // Retorna todas as ocorrências do banco de dados
    return await this.occurrencesRepository.find();
  }

}