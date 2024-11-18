import { Injectable } from '@nestjs/common';
import { User } from '../../domain/user';
import { UserMapper } from '../../mappers/user.map';
import { IUserRepository } from '../user-repository.interface';
import { PrismaService } from 'src/shared/infra/database/prisma/prisma-service.module';

@Injectable()
export class PgUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUserByEmail(email: string): Promise<User | null> {
    const result = await this.prisma.user.findUnique({
      where: { email },
    });
    return !!result ? UserMapper.toDomain(result) : null;
  }

  async findUserByUserId(userId: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    return user ? UserMapper.toDomain(user) : null;
  }

  async createUser(user: User): Promise<User | null> {
    const data = await UserMapper.toPersistence(user);
    const result = await this.prisma.user.create({
      data,
    });
    return !!result ? UserMapper.toDomain(result) : null;
  }

  async findUserByName(name: string): Promise<User[] | null> {
    const result = await this.prisma.user.findMany({
      where: {
        name: {
          startsWith: name,
          mode: 'insensitive',
        },
      },
    });
    return result ? result.map((user) => UserMapper.toDomain(user)) : null;
  }

  async findUsers(userId: string[]): Promise<User[] | null> {
    const users = await this.prisma.user.findMany({
      where: { id: { in: userId } },
    });
    return users ? users.map((user) => UserMapper.toDomain(user)) : null;
  }
}
