import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

// 인가를 인증처럼 미들웨어로 구현하면 안된다.
// 미들웨어는 단순히 자신의 일만 수행하고 next()를 호출하는 역할이기 때문에
// 실행 콘텍스트에 접근하지 못한다
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  private validateRequest(request: any) {
    const jwtString = request.headers.authorization.split('Bearer ')[1];

    this.authService.verify(jwtString);
    return true;
  }
}
