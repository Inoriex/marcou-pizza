import { User } from "@user/interfaces/user.interface";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetUser = createParamDecorator((data: unknown, ctx: ExecutionContext): Promise<User> => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
