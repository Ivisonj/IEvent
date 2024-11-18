import { User } from '../domain/user';

export abstract class IUserRepository {
  abstract findUserByEmail(email: string): Promise<User | null>;
  abstract findUserByUserId(userId: string): Promise<User | null>;
  abstract createUser(user: User): Promise<User | null>;
  abstract findUserByName(name: string): Promise<User[] | null>;
  abstract findUsers(userId: string[]): Promise<User[] | null>;
}
