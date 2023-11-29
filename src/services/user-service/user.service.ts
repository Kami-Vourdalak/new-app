import { UserRepository } from "../../repositories"

export class UserService {
    constructor(private readonly userRepository: UserRepository) { }

    async getUserById(id: string) {
        const user = await this.userRepository.findById(id)
        if (!user) throw new Error('User not found')

        return user
    }

    async getUsers() {
        const users = await this.userRepository.find()
        if (!users || !users?.length) throw new Error('Users not found')

        return users
    }

    async createUser(user: any) {
        const newUser = await this.userRepository.create(user)
        if (!newUser) throw new Error('User not created')

        return newUser
    }

    async updateUser(id: string, user: any) {
        const updatedUser = await this.userRepository.update(id, user)
        if (!updatedUser) throw new Error('User not updated')

        return updatedUser
    }
}