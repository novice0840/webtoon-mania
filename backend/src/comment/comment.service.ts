import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment, User, Like, Dislike } from 'src/entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Like) private likeRepository: Repository<Like>,
    @InjectRepository(Dislike) private dislikeRepository: Repository<Dislike>,
  ) {}
  getHello(): string {
    return 'github action test';
  }

  async createComment(user, webtoonId, content) {
    const userId = await this.userRepository.findOne({
      select: ['id'],
      where: { email: user.email },
    });
    return await this.commentRepository.save({
      writerId: userId.id,
      webtoonId,
      content,
    });
  }

  async deleteComment(commentId) {
    const comment = await this.commentRepository.find(commentId);
    if (!comment) {
      throw new ForbiddenException('삭제하려는 댓글이 존재하지 않습니다');
    }
    return await this.commentRepository.remove(comment);
  }
}
