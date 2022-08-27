import { Body, Controller, Get, Post } from "@nestjs/common";
import { BookmarkService } from "../services/bookmark.service";
import { BookmarkArticleDto } from "../dto/bookmark-article.dto";
import { ArticleBookmarkEntity } from "../entities/article-bookmark.entity";
import { UseJwtGuard } from "../../../guards/jwt.guard";
import { BookmarkSignalDto } from "../dto/bookmark-signal.dto";
import { SignalBookmarkEntity } from "../entities/signal-bookmark.entity";
import { ApiTags } from "@nestjs/swagger";
import { UseBearerAuth } from "../../../configuration/swagger/use-bearer-auth.decorator";
import { Generated } from "typeorm";
import { JwtUserInfo } from "../../../decorators/jwt-user-info.decorator";
import { IJwtUserInfo } from "../../auth/interfaces/jwt-user-info.interface";
import { ArticleEntity } from "../../article/entities/article.entity";

@ApiTags("[Bookmark]")
@Controller("bookmark")
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {
  }

  @UseBearerAuth()
  @UseJwtGuard()
  @Post("artilce")
  async bookmarkArticle(@Body() bookmarkArticleDto: BookmarkArticleDto): Promise<ArticleBookmarkEntity> {
    return this.bookmarkService.bookmarkArticle(bookmarkArticleDto);
  }

  @UseBearerAuth()
  @UseJwtGuard()
  @Post("signal")
  async bookmarkSignal(@Body() bookmarkSignalDto: BookmarkSignalDto): Promise<SignalBookmarkEntity> {
    return this.bookmarkService.bookmarkSignal(bookmarkSignalDto);
  }

  @UseBearerAuth()
  @UseJwtGuard()
  @Get("signals")
  async userBookmarkedSignals(@JwtUserInfo() userInfo: IJwtUserInfo): Promise<any> {
    return this.bookmarkService.userBookmarkedSignals(userInfo);
  }

  @UseBearerAuth()
  @UseJwtGuard()
  @Get("articles")
  async userBookmarkedArticle(@JwtUserInfo() userInfo: IJwtUserInfo): Promise<any> {
    return this.bookmarkService.userBookmarkedArticle(userInfo);
  }
}