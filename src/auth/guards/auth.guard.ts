import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from 'src/auth/decorators/public.decorator';
import { jwtPayload } from 'src/auth/types/jwt-payload';
import { PrismaService } from 'src/config/database/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    // console.log('auth Guards', request.cookies);

    const token: string | undefined | null =
      request.cookies?.access_token || this.extractTokenFromHeader(request);

    if (!token) return false;

    // console.log('decoded-token--------', token);

    try {
      const decoded = await this.jwtService.verifyAsync<jwtPayload>(
        token?.split(' ')[1],
        {
          secret: process.env.JWT_SECRET,
        },
      );
      // jwtPayload;

      // console.log('decoded', decoded);

      const user = await this.prisma.user.findUnique({
        where: { id: decoded.sub },
      });

      if (!user) {
        response
          .clearCookie('access_token', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
          })
        return false;
      }

      request.user = decoded;
    } catch {
      return false;
    }
    return true;
  }

  private extractTokenFromHeader(request: any): any {
    const token = request.headers.authorization;
    const type = token?.split(' ')[0];
    return type === 'Bearer' ? token : undefined;
  }
}
