import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ArticleBookmarkEntity } from "../entities/article-bookmark.entity";
import { In, Repository } from "typeorm";
import { SignalBookmarkEntity } from "../entities/signal-bookmark.entity";
import { ArticleEntity } from "../../article/entities/article.entity";
import { BookmarkArticleDto } from "../dto/bookmark-article.dto";
import { ArticleEnum } from "../../article/enums/article.enum";
import { UserEntity } from "../../auth/entities/user.entity";
import { UserEnum } from "../../auth/enums/user.enum";
import { SignalEntity } from "../../signal/entities/signal.entity";
import { BookmarkSignalDto } from "../dto/bookmark-signal.dto";
import { SignalEnum } from "../../signal/enums/signal.enum";
import { IJwtUserInfo } from "../../auth/interfaces/jwt-user-info.interface";

@Injectable()
export class BookmarkService {
  constructor(@InjectRepository(ArticleBookmarkEntity) private articleBookmarkRepo: Repository<ArticleBookmarkEntity>,
              @InjectRepository(SignalBookmarkEntity) private signalBookmarkRepo: Repository<SignalBookmarkEntity>,
              @InjectRepository(ArticleEntity) private articleRepo: Repository<ArticleEntity>,
              @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
              @InjectRepository(SignalEntity) private signalRepo: Repository<SignalEntity>
  ) {
  }

  async bookmarkArticle(bookmarkArticleDto: BookmarkArticleDto): Promise<ArticleBookmarkEntity> {
    const findArticle = await this.articleRepo.findOne({
      where: {
        id: bookmarkArticleDto.articleId,
        status: ArticleEnum.ACTIVE
      }
    });
    if (!findArticle)
      throw new NotFoundException("Article Not Exist");

    const findUser = await this.userRepo.findOne({ where: { id: bookmarkArticleDto.userId, status: UserEnum.ACTIVE } ,relations:["obj_article_bookmarks"]});

    const articleBookmark = new ArticleBookmarkEntity();
    articleBookmark.obj_article = findArticle;
    articleBookmark.obj_user = findUser;
    const save = await this.articleBookmarkRepo.save(await this.articleBookmarkRepo.create(articleBookmark));

    findUser.obj_article_bookmarks.push(save)
    const saveUser=await this.userRepo.save(await this.userRepo.create(findUser))
    return save;
  }

  async bookmarkSignal(bookmarkSignalDto: BookmarkSignalDto): Promise<SignalBookmarkEntity> {
    const findSignal = await this.signalRepo.findOne({
      where: {
        id: bookmarkSignalDto.signalId,
        status: SignalEnum.ACTIVE
      }
    });
    const findUser = await this.userRepo.findOne({ where: { id: bookmarkSignalDto.userId, status: UserEnum.ACTIVE , },relations:{obj_signal_bookmarks:true}});

    const signalBookmark = new SignalBookmarkEntity();
    signalBookmark.obj_signal = findSignal;
    signalBookmark.obj_user = findUser;
    const save = await this.signalBookmarkRepo.save(await this.signalBookmarkRepo.create(signalBookmark));

    findUser.obj_signal_bookmarks.push(save)
    const saveUser=await this.userRepo.save(await this.userRepo.create(findUser))

    return save;
  }

  async userBookmarkedSignals(userInfo: IJwtUserInfo): Promise<SignalBookmarkEntity[]> {
    const findUser = await this.userRepo.findOne({ where: { id: userInfo.userId } });

    const query=await this.signalBookmarkRepo.createQueryBuilder("bookmarkSignal")
      .leftJoin("bookmarkSignal.obj_user","user")
      .where("user.id=:userId",{userId:findUser.id})
      .select("bookmarkSignal.id")
      .leftJoinAndSelect("bookmarkSignal.obj_signal","signal")
      .getMany()

    return query
  }

  async userBookmarkedArticle(userInfo: IJwtUserInfo): Promise<ArticleBookmarkEntity[]> {

    const findUser = await this.userRepo.findOne({ where: { id: userInfo.userId } ,relations:{obj_article_bookmarks:true}});

    const query=await this.articleBookmarkRepo.createQueryBuilder("articleBookmark")
      .leftJoin("articleBookmark.obj_user","user")
      .where("user.id=:userId",{userId:findUser.id})
      .select("articleBookmark.id")
      .leftJoinAndSelect("articleBookmark.obj_article","article")
      .getMany()

    return query
  }
}