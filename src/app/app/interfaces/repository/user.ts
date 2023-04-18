import { UserEntity, UserInterface } from "src/app/domain/entities/user";
import { Either } from "../../errors/either";
import { ErrorBase } from "../../errors/errorBase";

export interface createUserUserRepo extends Omit<UserInterface,"id"|"createdAt"|"updatedAt">{id?:string}

export interface userRepositoryImp{
    create:(user:createUserUserRepo)=>Promise<Either<ErrorBase,UserEntity>>
    findById:(id:string)=>Promise<Either<ErrorBase,UserEntity>>
    findByEmail:(email:string)=>Promise<Either<ErrorBase,UserEntity>>
}