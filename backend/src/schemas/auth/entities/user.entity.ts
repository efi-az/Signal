import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity, Generated, JoinColumn,
  JoinTable,
  ManyToMany, OneToMany, OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { UserEnum } from "../enums/user.enum";
import { RoleEntity } from "./role.entity";
import { UserInfoEntity } from "./user-info.entity";
import { CreditEntity } from "../../signal/entities/credit.entity";
import { SignalEntity } from "../../signal/entities/signal.entity";
import { CustomSignalRequestEntity } from "../../signal/entities/custom-signal-request.entity";
import { CustomizedSignalEntity } from "../../signal/entities/custom-signal.entity";
import { ArticleEntity } from "../../article/entities/article.entity";
import { SignalBookmarkEntity } from "../../bookmark/entities/signal-bookmark.entity";
import { ArticleBookmarkEntity } from "../../bookmark/entities/article-bookmark.entity";
import { PermissionEntity } from "./permission.entity";
import { ReferralEntity } from "./referral.entity";

@Entity({ schema: "AUTH" })
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  mobilePrefix: string;

  @Column({nullable:true})
  mobile: string;

  @Column({nullable:true})
  email: string;

  @Column()
  @Generated("rowid")
  referralCode:number

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: "enum", enum: UserEnum, default: UserEnum.ACTIVE })
  status: UserEnum;

  @ManyToMany(() => RoleEntity)
  @JoinTable()
  obj_roles: RoleEntity[];

  @ManyToMany(() => PermissionEntity)
  @JoinTable()
  obj_permissions: PermissionEntity[];

  @OneToOne(() => UserInfoEntity)
  @JoinColumn()
  obj_userInfo: UserInfoEntity;

  @OneToMany(() => CreditEntity, x => x.obj_user)
  @JoinTable()
  obj_credits: CreditEntity[];

  @OneToMany(() => SignalEntity, x => x.obj_user)
  @JoinTable()
  obj_signals: SignalEntity[];

  @OneToMany(() => CustomSignalRequestEntity, x => x.obj_user)
  @JoinTable()
  obj_custom_signals_request: CustomSignalRequestEntity[];

  @OneToMany(() => CustomizedSignalEntity, x => x.obj_user)
  @JoinTable()
  obj_custom_signals: CustomizedSignalEntity[];

  @OneToMany(() => ArticleEntity, x => x.obj_user)
  @JoinTable()
  obj_articles: ArticleEntity[];

  @OneToMany(()=>ArticleBookmarkEntity,x=>x.obj_user)
  obj_article_bookmarks:ArticleBookmarkEntity[]

  @OneToMany(()=>SignalBookmarkEntity,x=>x.obj_user)
  obj_signal_bookmarks:SignalBookmarkEntity[]

  @BeforeInsert()
  mobileNormalize() {
    const mobileNumber = this.mobile;
    if (mobileNumber.startsWith("0")) {
      mobileNumber.replace("0", "");
      this.mobile = mobileNumber;
    }
  }

  @BeforeInsert()
  mobilePrefixNormalize() {
    const mobilePrefix = this.mobilePrefix;
    if (!mobilePrefix.startsWith("+")) {
      this.mobilePrefix = `+${mobilePrefix}`;
    }
  }
}