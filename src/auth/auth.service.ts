import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/database/prisma.service';
import { SocialMediaValidateUser, ValidateUser } from './types/jwt-payload';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(user: ValidateUser) {
    const foundUser = await this.prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!foundUser) return null;
    if (foundUser.provider === 'LOCAL' && user.password !== foundUser.password)
      return null;

    return foundUser;
  }

  async findOrCreateUser(user: ValidateUser) {
    const { email, password, provider, image } = user;

    if (!email || !provider) {
      return null;
    }
    if (provider === 'LOCAL' && !password)
      throw new HttpException('Password is required', 400);

    return await this.prisma.user.create({
      data: {
        email: email,
        provider: provider === 'GOOGLE' ? 'GOOGLE' : 'LOCAL',
        image: image,
        password: password ?? null,
      },
      select: {
        id: true,
        email: true,
        provider: true,
        image: true,
      },
    });
  }

  async socialmediaLogin(user: SocialMediaValidateUser) {
    if (!user.email || !user.provider) {
      throw new HttpException('No user from google', 400);
    }
    const checkUser = await this.validateUser(user);
    if (checkUser) {
      const token = await this.generateToken(checkUser);
      return { ...checkUser, token };
    } else {
      const newUser = await this.findOrCreateUser(user);
      const token = await this.generateToken(newUser);
      return { ...newUser, token };
    }
  }

  async generateToken(checkUser: any) {
    const payload = {
      sub: checkUser.id,
      email: checkUser.email,
      provider: checkUser.provider,
    };
    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1h',
    });
    return `Bearer ${token}`;
  }

  async getUser(id: string) {
    return await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        provider: true,
        image: true,
      },
    });
  }
}
