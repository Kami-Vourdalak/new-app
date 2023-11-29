import { DBAdapterFilter, DBAdapterProjection } from "../";

export interface UserEntity {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

export type UserEntityCreate = Omit<UserEntity, 'id'>

export interface IUserRepository {
    find(projection?: DBAdapterProjection<UserEntity>, filters?: DBAdapterFilter<UserEntity>): Promise<UserEntity[]>;
    findById(id: string, projection?: (keyof UserEntity)[]): Promise<UserEntity>;
    update(id: string, user: UserEntity): Promise<UserEntity>;
    delete(id: string): void;
    create(newUser: UserEntityCreate): Promise<UserEntity>;
}