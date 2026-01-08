import {
  ConflictException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/config/database/prisma.service';
import {
  CreateValidateUser,
  SocialMediaValidateUser,
  ValidateUser,
} from './types/jwt-payload';
import { JwtService } from '@nestjs/jwt';
import { CreateUser, LocalUserLoginDto } from './dto/createUser.Dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(user: ValidateUser): Promise<any> {
    const foundUser = await this.prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!foundUser) return null;
    if (foundUser.provider === 'LOCAL' && !user.password)
      throw new HttpException('Invalid Credentials', 401);

    return foundUser;
  }

  async createUser(user: CreateValidateUser) {
    const { email, password, provider, image, firstName, lastName } = user;

    if (!email || !provider) {
      return null;
    }
    if (provider === 'LOCAL' && !password)
      throw new HttpException('Invalid Credentials', 401);

    return await this.prisma.user.create({
      data: {
        email: email,
        provider:
          provider === 'GOOGLE'
            ? 'GOOGLE'
            : provider === 'GITHUB'
              ? 'GITHUB'
              : 'LOCAL',
        firstName,
        lastName: lastName ?? null,
        image: image ?? null,
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

  async socialmediaLogin(user: SocialMediaValidateUser): Promise<string> {
    if (!user.email || !user.provider) {
      throw new HttpException('No user from google', 400);
    }

    const checkUser = await this.validateUser(user);
    if (checkUser) {
      const token = await this.generateToken(checkUser);
      return token;
    } else {
      const newUser = await this.createUser(user);
      const token = await this.generateToken(newUser);
      return token;
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
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        provider: true,
        image: true,
      },
    });
    if (!user) return null;
    const { firstName, lastName, ...rest } = user;
    return { name: `${firstName} ${lastName}`, ...rest };
  }

  async createUserRegistration(data: CreateUser) {
    const extcUser = await this.validateUser({ ...data, provider: 'LOCAL' });
    if (extcUser)
      throw new ConflictException('Your Have a already account, Pleate login');

    const newUser = await this.createUser({ ...data, provider: 'LOCAL' });
    const token = await this.generateToken(newUser);
    return token;
  }

  async loginUser(data: LocalUserLoginDto) {
    const extcUser = await this.validateUser({ ...data, provider: 'LOCAL' });
    // console.log('loginUser - extcUser', extcUser);
    if (!extcUser)
      throw new UnauthorizedException(
        'Your Have No account, Pleate First Registration',
      );
    const token = await this.generateToken(extcUser);
    return token;
  }
}
