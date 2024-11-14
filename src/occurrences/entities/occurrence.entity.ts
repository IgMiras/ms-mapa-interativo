import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('occurrences')
export class Occurrence {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column('jsonb')
  coordinates: {
    lat: number;
    lng: number;
  };

  @Column({ type: 'varchar', default: '' })
  description: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
