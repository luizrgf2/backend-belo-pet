import { UserEntity, UserInterface } from "src/app/domain/entities/user"
import { Either, Left, Right } from "../../errors/either"
import { ErrorBase } from "../../errors/errorBase"
import { JWTImp } from "../../interfaces/encryptor/jwt"
import { UserConfirmationTokenInvalidError } from "../../errors/user/userConfirmationTokenInvalid"
import { userRepositoryImp } from "../../interfaces/repository/user"

export interface ConfirmEmailInput{
    token:string
}

export interface ConfirmEmailOutput{
    user:UserInterface
}

export interface ConfirmEmailInterface{
    exec:(input:ConfirmEmailInput)=>Promise<Either<ErrorBase,ConfirmEmailOutput>>
}

interface TokenResponse{
    email:string,
    id:string
}


export class ConfirmEmailUseCase implements ConfirmEmailInterface{

    constructor(
        private readonly JWT:JWTImp,
        private readonly userRepo:userRepositoryImp
    ){}

    private decodeToken(token:string):Either<ErrorBase,TokenResponse>{
        const tokenDecoded = this.JWT.decode<TokenResponse>(token)
        if(tokenDecoded.left) return Left.create(tokenDecoded.left)
        if(!(tokenDecoded.right instanceof Object)) return Left.create(new UserConfirmationTokenInvalidError())
        const {email,id} = tokenDecoded.right
        if(!email || !id || id.length === 0 || email.length === 0) return Left.create(new UserConfirmationTokenInvalidError())
        return Right.create({
            email:email,
            id:id
        })
    }

    private async checkIfUserWithEmailAndIdExists(email:string,id:string):Promise<Either<ErrorBase,UserEntity>>{
        const userData = await this.userRepo.findByEmailAndId(email,id)
        if(userData.left) return Left.create(userData.left)
        return Right.create(userData.right)
    }

    private async confirmEmail(id:string):Promise<Either<ErrorBase,void>>{
        const confirmationOfEmail = await this.userRepo.confirmUserEmail(id)
        if(confirmationOfEmail.left) return Left.create(confirmationOfEmail.left)
        return Right.create(undefined)
    }

    async exec (input: ConfirmEmailInput) : Promise<Either<ErrorBase, ConfirmEmailOutput>>{
        const {token} = input
        
        const tokenDataDecoded = this.decodeToken(token)
        if(tokenDataDecoded.left) return Left.create(tokenDataDecoded.left)
        const {email,id} = tokenDataDecoded.right

        const userData = await this.checkIfUserWithEmailAndIdExists(email,id)
        if(userData.left) return Left.create(userData.left)

        const confirmationOfEmail = await this.confirmEmail(id)
        if(confirmationOfEmail.left) return Left.create(confirmationOfEmail.left)

        return Right.create({
            user:userData.right.user
        })
    }

}