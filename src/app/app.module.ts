import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Occurrence } from '../occurrences/entities/occurrence.entity';
import { OccurrencesModule } from 'src/occurrences/occurrences.module';
import { SocketModule } from 'src/socket/socket.module';

@Module({
  imports: [
    // ConfigModule para carregar variáveis de ambiente
    ConfigModule.forRoot({
      isGlobal: true, // Variáveis disponíveis em todo o app
    }),
    // TypeOrmModule configurado diretamente via código
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: +process.env.DATABASE_PORT || 5432,
      username: process.env.DATABASE_USERNAME || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'password',
      database: process.env.DATABASE_NAME || 'mydatabase',
      entities: [Occurrence], // As entidades usadas no TypeORM
      synchronize: true, // Usar apenas em desenvolvimento
    }),
    SocketModule,
    OccurrencesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
