import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment, Like, Dislike, User } from 'src/entity';
import { Repository, DataSource } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    @InjectRepository(Like) private likeRepository: Repository<Like>,
    @InjectRepository(Dislike) private dislikeRepository: Repository<Dislike>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly dataSource: DataSource,
  ) {}

  async getWebtoonComments(webtoonId, user) {
    if (user) {
      const userComments = (
        await this.dataSource.query(`select id from comment where webtoon_id="${webtoonId}" and writer_id="${user.id}"`)
      ).map((element) => element.id);

      if (userComments) {
        const comments = await this.dataSource.query(
          `select comment.id as id, comment.content as content, 
          comment.like as 'like', comment.dislike as dislike, 
          comment.created_at as createdAt, user.name as writerName
          from comment inner join user on comment.writer_id = user.id where comment.webtoon_id="${webtoonId}"`,
        );
        return comments.map((comment) => {
          if (userComments.includes(comment.id)) {
            return { ...comment, my: true };
          }
          return comment;
        });
      }
    }

    return await this.dataSource.query(
      `select comment.id as id, comment.content as content, 
      comment.like as 'like', comment.dislike as dislike, 
      comment.created_at as createdAt, user.name as writerName
      from comment inner join user on comment.writer_id = user.id where comment.webtoon_id="${webtoonId}"`,
    );
  }

  async getUserComments(userId) {
    return await this.commentRepository.find({
      where: { writerId: userId },
      relations: ['webtoon'],
    });
  }

  async createComment(userId, webtoonId, content) {
    return await this.commentRepository.save({
      writerId: userId,
      webtoonId,
      content,
    });
  }

  async deleteComment(userId, commentId) {
    const comment = await this.commentRepository.find({
      where: { id: commentId, writerId: userId },
    });

    if (!comment) {
      throw new ForbiddenException('삭제하려는 댓글이 존재하지 않습니다');
    }
    return await this.commentRepository.remove(comment);
  }

  async clickLiketButton(userId, commentId) {
    return this.clickEmotionButton(userId, commentId, 'like');
  }

  async clickDislikstButton(userId, commentId) {
    return this.clickEmotionButton(userId, commentId, 'dislike');
  }

  @Transactional()
  private async clickEmotionButton(userId, commentId, emotion) {
    // 4가지 경우로 나눠진다
    // 1.좋아요 클릭  2.좋아요 해제  3.싫어요 클릭 4.싫어요 해제
    const commentEntity = await this.commentRepository.findOne({ where: { id: commentId } });
    if (emotion === 'like') {
      const likeEntity = await this.likeRepository.findOne({ where: { userId, commentId } });
      if (likeEntity) {
        commentEntity.like -= 1;
        await this.likeRepository.delete(likeEntity);
      } else {
        commentEntity.like += 1;
        const newLike = new Like();
        newLike.userId = userId;
        newLike.commentId = commentId;
        await this.likeRepository.save(newLike);
      }
    } else if (emotion === 'dislike') {
      const dislikeEntity = await this.dislikeRepository.findOne({ where: { userId, commentId } });
      if (dislikeEntity) {
        commentEntity.dislike -= 1;
        await this.dislikeRepository.delete(dislikeEntity);
      } else {
        commentEntity.dislike += 1;
        const newDislike = new Dislike();
        newDislike.userId = userId;
        newDislike.commentId = commentId;
        await this.dislikeRepository.save(newDislike);
      }
    } else {
      throw new Error('존재하지 않은 감정버튼이 입력되었습니다');
    }
    await this.commentRepository.save(commentEntity);
  }
}
