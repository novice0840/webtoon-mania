import { Injectable } from '@nestjs/common';

@Injectable()
export class ChattingService {
  getHello(): string {
    return 'github action test';
  }
}
