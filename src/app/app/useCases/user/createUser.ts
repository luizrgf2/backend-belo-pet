import { UserEntity, UserInterface } from "../../../domain/entities/user";
import { Either, Left, Right } from "../../errors/either";
import { ErrorBase } from "../../errors/errorBase";
import { userRepositoryImp } from "../../interfaces/repository/user";
import { UserExistsError } from "../../errors/user/userExists";
import { UserNotExists } from "../../errors/user/userNotExists";
import { FieldsValidator } from "../../interfaces/validators/fieldsValidator";
import { UserEmailInvalidError } from "../../errors/user/userEmailInvalid";

interface createUser extends Omit<UserInterface,"id"|"createdAt"|"updatedAt">{
    id?:string
}

export interface createUserInput{
    user:createUser
}

export interface createUserOutput{
    user:UserInterface
}

export interface createUserInterface{
    exec:(input:createUserInput)=>Promise<Either<ErrorBase,createUserOutput>>
}

export class CreateUserUseCase implements createUserInterface{

    constructor(
        private readonly userRepo:userRepositoryImp,
        private readonly fieldsValidator:FieldsValidator
    ){}

    private async checkIfEmailExists(email:string):Promise<Either<ErrorBase,void>>{
        const userEmailExists = await this.userRepo.findByEmail(email)
        if(userEmailExists.left) {
            if(userEmailExists.left instanceof UserNotExists){
                return Right.create(undefined)
            }
            return Left.create(userEmailExists.left)
        }
        return Left.create(new UserExistsError())
    }

    private async createUser(input:createUser):Promise<Either<ErrorBase,UserEntity>>{
        const userData = await this.userRepo.create({
            ...input
        })
        if(userData.left) return Left.create(userData.left)
        return Right.create(userData.right)
    }

    async exec (input: createUserInput) : Promise<Either<ErrorBase, createUserOutput>>{
        const {user:{email,name,password,id}} = input
        const userData = UserEntity.create({
            email,
            name,
            password
        }) 

        const validEmail = this.fieldsValidator.isValidEmail(email)
        
        if(!validEmail) return Left.create(new UserEmailInvalidError())

        if(userData instanceof Error) return Left.create(new ErrorBase(userData.message,400))
        const userEmailExists = await this.checkIfEmailExists(email)
        if(userEmailExists.left) return Left.create(userEmailExists.left)

        const userCreated = await this.createUser({
            email,
            name,
            password,
            id:id
        })

        if(userCreated.left) return Left.create(userCreated.left)
        return Right.create({
            user:userCreated.right.user
        })
    }


}