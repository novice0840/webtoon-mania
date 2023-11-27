import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment, Like, Dislike } from 'src/entity';
import { Repository, DataSource } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    @InjectRepository(Like) private likeRepository: Repository<Like>,
    @InjectRepository(Dislike) private dislikeRepository: Repository<Dislike>,
    private readonly dataSource: DataSource,
  ) {}

  async getWebtoonComments(webtoonId, user) {
    // 로그인이 되어 있고 유저가 해당 웹툰에 댓글을 남긴 경우 해당 댓글에 표식을 남김
    if (!user) {
      return await this.commentRepository.find({
        where: { webtoonId },
      });
    }
    // 아닌 경우는 단순히 댓글들만 반환
    return await this.commentRepository.find({
      where: { webtoonId },
    });
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

  private async clickEmotionButton(userId, commentId, button) {
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
