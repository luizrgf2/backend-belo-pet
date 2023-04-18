import { UserInterface } from "../../../domain/entities/user"
import { Either, Left, Right } from "../../errors/either"
import { ErrorBase } from "../../errors/errorBase"
import { UserEmailInvalidError } from "../../errors/user/userEmailInvalid"
import { userRepositoryImp } from "../../interfaces/repository/user"
import { FieldsValidator } from "../../interfaces/validators/fieldsValidator"
import { UserPasswordInvalidError } from "../../errors/user/userPasswordInvalid"
import { EncryptorImp } from "../../interfaces/encryptor/encryptor"
import { UserNotExistsError } from "../../errors/user/userNotExists"
import { UserAuthError } from "../../errors/user/userAuthError"
import { JWTImp } from "../../interfaces/encryptor/jwt"

export interface AuthUserInput{
    email:string,
    password:string
}

export interface AuthUserOutput{
    token:string,
    user:UserInterface
}

export interface AuthUserInterface{
    exec:(input:AuthUserInput)=>Promise<Either<ErrorBase,AuthUserOutput>>
}

export class AuthUserUseCase implements AuthUserInterface{

    constructor(
        private readonly validator:FieldsValidator,
        private readonly userRepo:userRepositoryImp,
        private readonly encryptor: EncryptorImp,
        private readonly jwt: JWTImp
    ){}

    checkFields(input:AuthUserInput):Either<ErrorBase,void>{
        if(!input.email){
            return Left.create(new UserEmailInvalidError())
        }
        if(!input.password){
            return Left.create(new UserPasswordInvalidError())
        }
        return Right.create(undefined)
    }

    async exec (input: AuthUserInput) : Promise<Either<ErrorBase, AuthUserOutput>>{
        const {email,password} = input
        const fieldsValids = this.checkFields(input)
        if(fieldsValids.left) return Left.create(fieldsValids.left)

        const isEmailValid = this.validator.isValidEmail(email)
        if(!isEmailValid){
            return Left.create(new UserEmailInvalidError())
        }

        const userData = await this.userRepo.findByEmail(email)
        if(userData.left){
            if(userData.left instanceof UserNotExistsError){
                return Left.create(new UserAuthError())
            }
             return Left.create(userData.left)
        }

        const isCorrectPassword = this.encryptor.decode(userData.right.user.password,password)

        if(!isCorrectPassword) return Left.create(new UserAuthError())

        const tokenJwt = this.jwt.encode<string>(userData.right.user.id)

        return Right.create({
            token:tokenJwt,
            user:{...userData.right.user,password:undefined}
        })

    }
}