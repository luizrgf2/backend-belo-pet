import { Either, Left, Right } from "../../src/app/app/errors/either";
import { ErrorBase } from "../../src/app/app/errors/errorBase";
import { UserNotExistsError } from "../../src/app/app/errors/user/userNotExists";
import { createUserUserRepo, userRepositoryImp } from "../../src/app/app/interfaces/repository/user";
import { UserEntity, UserInterface } from "../../src/app/domain/entities/user";
import { validUser } from "../user/userData";

export class UserRepoInMemory implements userRepositoryImp{
    
    user:UserInterface[] = []
    
    async create (user: createUserUserRepo) : Promise<Either<ErrorBase, UserEntity>>{
        this.user.push(validUser)
        return Right.create(new UserEntity(this.user[0]))
    }

    async findById (id: string) : Promise<Either<ErrorBase, UserEntity>>{
        const userFind = this.user.find(user=>user.id === id)
        if(!userFind) return Left.create(new UserNotExistsError())
        return Right.create(new UserEntity({...userFind}))
    }

    async findByEmail (email: string) : Promise<Either<ErrorBase, UserEntity>>{
        const userFind = this.user.find(user=>user.email === email)
        if(!userFind) return Left.create(new UserNotExistsError())
        return Right.create(new UserEntity({...userFind}))
    }


}