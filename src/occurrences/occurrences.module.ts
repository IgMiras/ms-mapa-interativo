import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OccurrencesController } from './occurrences.controller';
import { OccurrencesService } from './occurrences.service';
import { Occurrence } from './entities/occurrence.entity';
import { SocketModule } from '../socket/socket.module';

@Module({
  imports: [
    forwardRef(() => SocketModule),  // Usa forwardRef para resolver a circularidade
    TypeOrmModule.forFeature([Occurrence]),
  ],
  controllers: [OccurrencesController],
  providers: [OccurrencesService],
  exports: [OccurrencesService],  // Exporta OccurrencesService para outros módulos
})
export class OccurrencesModule {}
