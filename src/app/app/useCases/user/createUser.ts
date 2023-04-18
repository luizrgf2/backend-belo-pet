import { UserEntity, UserInterface } from "../../../domain/entities/user";
import { Either, Left, Right } from "../../errors/either";
import { ErrorBase } from "../../errors/errorBase";
import { userRepositoryImp } from "../../interfaces/repository/user";
import { UserExistsError } from "../../errors/user/userExists";
import { UserNotExistsError } from "../../errors/user/userNotExists";
import { UserEmailInvalidError } from "../../errors/user/userEmailInvalid";
import { EncryptorImp } from "../../interfaces/encryptor/encryptor";
import { InvalidEmailError } from "../../../domain/errors/user/invalidEmail";
import { FieldsValidator } from "../../interfaces/validators/fieldsValidator";

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
        private readonly encryptor:EncryptorImp,
        private readonly validator:FieldsValidator
    ){}

    private async checkIfEmailExists(email:string):Promise<Either<ErrorBase,void>>{
        const userEmailExists = await this.userRepo.findByEmail(email)
        if(userEmailExists.left) {
            if(userEmailExists.left instanceof UserNotExistsError){
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

        
        const emailValid = this.validator.isValidEmail(email)

        if(!emailValid) return Left.create(new UserEmailInvalidError())

        const userData = UserEntity.create({
            email,
            name,
            password
        }) 

        if(userData instanceof Error) {
            if(userData instanceof InvalidEmailError){
                return Left.create(new UserEmailInvalidError()) 
            }
            return Left.create(new ErrorBase(userData.message,400))
        }

        
        
        userData.user.id = id
        userData.user.password = this.encryptor.encode(userData.user.password)

        const userEmailExists = await this.checkIfEmailExists(email)
        if(userEmailExists.left) return Left.create(userEmailExists.left)

        const userCreated = await this.createUser(userData.user)

        if(userCreated.left) return Left.create(userCreated.left)


        return Right.create({
            user:{...userCreated.right.user,password:undefined}
        })
    }


}