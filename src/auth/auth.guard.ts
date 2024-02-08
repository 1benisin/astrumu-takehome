import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
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

    console.log(request.headers);
    const authToken = request.headers['authtoken'];
    console.log('authoken', authToken);

    if (authToken) {
      return true;
    }
    return false;
  }
}
