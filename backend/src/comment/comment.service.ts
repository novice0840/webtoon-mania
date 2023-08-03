import { Injectable } from '@nestjs/common';
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
    const user_id;
    return 'create comment';
  }
}
