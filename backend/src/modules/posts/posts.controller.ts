import { Controller, Get } from '@nestjs/common';

@Controller('posts')
export class PostsController {
  constructor() {}

  @Get()
  async getPosts() {
    return 'getPosts';
  }
}
