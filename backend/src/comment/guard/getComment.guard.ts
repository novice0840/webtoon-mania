import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtGetCommentGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info: Error) {
    // 사용자 정보가 없더라도 통과시키기 위해 아무 동작도 하지 않음
    if (err || !user) {
      return null;
    }
    return user;
  }
}
