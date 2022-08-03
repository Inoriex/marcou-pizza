import { IUser } from "@user/interfaces/user.interface";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetUser = createParamDecorator((data: unknown, ctx: ExecutionContext): Promise<IUser> => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
