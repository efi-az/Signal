import {
  Column, CreateDateColumn, Entity,
  JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { MarketEnum } from '../enums/market.enum';
import { BarginEnum } from '../enums/bargin.enum';
import { TargetPointsJson } from '../classes/target-points.json';
import { SignalEnum } from '../enums/signal.enum';
import { UserEntity } from '../../auth/entities/user.entity';
import { SignalTpStatus } from '../enums/signal-tp-status.enum';
import { SignalImageEntity } from './signal-image.entity';
import { SignalBookmarkEntity } from "../../bookmark/entities/signal-bookmark.entity";
import { MarketEntity } from "./market.entity";

@Entity({ schema: 'SIGNAL' })
export class SignalEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: MarketEnum })
  marketType: MarketEnum;

  @Column({ nullable: true })
  leverage: number;

  @Column({ type: 'enum', enum: BarginEnum })
  barginType: BarginEnum;

  @Column()
  risk: number;

  @Column()
  entryPrice: number;

  @Column()
  stopLoss: number;

  @Column({ type: 'jsonb' })
  targetPoints: TargetPointsJson[];

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'enum', enum: SignalEnum, default: SignalEnum.ACTIVE })
  status: SignalEnum;

  @Column({ type: 'enum', enum: SignalTpStatus, default:SignalTpStatus.ELIMINATED })
  tpStatus: SignalTpStatus;

  @ManyToOne(() => UserEntity, x => x.obj_signals)
  @JoinColumn()
  obj_user: UserEntity;

  @OneToOne(() => SignalImageEntity)
  @JoinColumn()
  obj_image: SignalImageEntity;

  @OneToMany(()=>SignalBookmarkEntity,x=>x.obj_signal)
  obj_signal_bookmarks:SignalBookmarkEntity[]

  @ManyToOne(()=>MarketEntity,x=>x.obj_signals)
  @JoinColumn()
  obj_market:MarketEntity
}