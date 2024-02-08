import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Try to access GraphQL context
    const ctx = GqlExecutionContext.create(context);
    const gqlCtx = ctx.getContext();
    const request = gqlCtx.req || context.switchToHttp().getRequest();

    const authToken = request.headers['authtoken'];

    if (!authToken) {
      throw new UnauthorizedException(
        'Missing authToken in request headers. Set to any value to authenticate. 😉',
      );
    }

    return true;
  }
}
