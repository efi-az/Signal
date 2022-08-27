import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ImageEnum } from '../../auth/enums/image.enum';

@Entity({ schema: 'SIGNAL' })
export class SignalImageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fileName: string;

  @Column({nullable:true})
  filePath: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'enum', enum: ImageEnum, default: ImageEnum.ACTIVE })
  status: ImageEnum;
}