import { UserConfirmationEmailError } from "../../src/app/app/errors/user/userConfirmationEmail";
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


    async findByEmailAndId (id: string, email: string) : Promise<Either<ErrorBase, UserEntity>>{
        console.log(id,email)
        const userToReturn = this.user.filter(item=>(item.id === id && item.email === email))
        if(!userToReturn) return Left.create(new UserNotExistsError())
        return Right.create(new UserEntity({...userToReturn[0]}))
    }

    async confirmUserEmail (id: string) :Promise<Either<ErrorBase, void>>{
        let userToReturn = this.user.filter(item=>(item.id === id ))
        const userIndex = this.user.indexOf(userToReturn[0])
        this.user[userIndex] = {...userToReturn[0],emailConfirmation:true}
        userToReturn = this.user.filter(item=>(item.id === id ))

        if(userToReturn[0].emailConfirmation === true) return Right.create(undefined)
        return Left.create(new UserConfirmationEmailError())
    }


}