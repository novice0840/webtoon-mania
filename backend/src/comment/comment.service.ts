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
  private async clickEmotionButton(userId, commentId, button) {
    const commentEntity = await this.commentRepository.findOne({ where: { id: commentId } });
    commentEntity.like += 1;
    await this.commentRepository.save(commentEntity);

    // const likeEntity = new Like();
    // await this.likeRepository.save(likeEntity);
  }

  private async clickEmotionButton2(userId, commentId, button) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction(); // 3

    try {
      const emotion = await queryRunner.manager.findOne(button === 'like' ? Like : Dislike, {
        where: { userId, commentId },
      });
      const comment = await queryRunner.manager.findOne(Comment, {
        where: { id: commentId },
      });
      if (button === 'like') {
        if (emotion) {
          comment.like = Math.max(comment.like - 1, 0);
          await queryRunner.manager.remove(emotion);
        } else {
          comment.like = Math.max(comment.like + 1, 0);
          const newEmotion = button === 'like' ? new Like() : new Dislike();
          newEmotion.userId = userId;
          newEmotion.commentId = commentId;
          await queryRunner.manager.save(newEmotion);
        }
      } else {
        if (emotion) {
          comment.dislike = Math.max(comment.dislike - 1, 0);
          await queryRunner.manager.remove(emotion);
        } else {
          comment.dislike = Math.max(comment.dislike + 1, 0);
          const newEmotion = button === 'like' ? new Like() : new Dislike();
          newEmotion.userId = userId;
          newEmotion.commentId = commentId;
          await queryRunner.manager.save(newEmotion);
        }
      }

      await queryRunner.manager.save(comment);
      await queryRunner.commitTransaction(); // 4
    } catch (e) {
      await queryRunner.rollbackTransaction(); // 5
    } finally {
      await queryRunner.release(); // 6
    }

    return {
      success: true,
      message: `${button === 'like' ? '좋아요' : '싫어요'} 버튼 클릭 성공`,
    };
  }
}
