import { IUserRepository, UserEntity, UserEntityCreate } from "./";
import { DBAdapter, DBAdapterFilter, DBAdapterFilterOperator, DBAdapterProjection } from "../";

export class UserRepository implements IUserRepository {

    constructor(private db: DBAdapter<UserEntity>) { }

    async find(projection?: DBAdapterProjection<UserEntity>, filters?: DBAdapterFilter<UserEntity>): Promise<UserEntity[]> {
        return this.db.query({ projection, filters })
    }

    async findById(id: string, projection?: (keyof UserEntity)[]): Promise<UserEntity> {
        const foundUsers = await this.db.query({
            projection,
            filters: {
                id: { [DBAdapterFilterOperator.EQ]: id }
            }
        })
        if (foundUsers?.length) {
            return foundUsers[0]
        }
        throw new Error('User not found')
    }

    async create(user: UserEntityCreate): Promise<UserEntity> {
        return this.db.insert(user);
    }

    async update(id: string, user: UserEntityCreate): Promise<UserEntity> {
        const updatedUser = await this.db.update(id, user)

        return updatedUser;
    }

    async delete(id: string) {
        this.db.delete(id)
    }
}