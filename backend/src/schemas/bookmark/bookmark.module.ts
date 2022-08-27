import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { ArticleBookmarkEntity } from "./entities/article-bookmark.entity";
import { BookmarkService } from "./services/bookmark.service";
import { BookmarkController } from "./controllers/bookmark.controller";
import { SignalBookmarkEntity } from "./entities/signal-bookmark.entity";
import { SignalEntity } from "../signal/entities/signal.entity";
import { ArticleEntity } from "../article/entities/article.entity";
import { UserEntity } from "../auth/entities/user.entity";

@Module({
    imports:[TypeOrmModule.forFeature([ArticleBookmarkEntity,SignalBookmarkEntity,SignalEntity,ArticleEntity,UserEntity])],
    providers:[BookmarkService],
    controllers:[BookmarkController]
})
export class BookmarkModule {}