import { Module, forwardRef } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { OccurrencesModule } from '../occurrences/occurrences.module';

@Module({
  imports: [forwardRef(() => OccurrencesModule)],  // Usa forwardRef para evitar a dependência circular
  providers: [SocketGateway],  // Registra o gateway
  exports: [SocketGateway],    // Exporta o gateway
})
export class SocketModule {}
