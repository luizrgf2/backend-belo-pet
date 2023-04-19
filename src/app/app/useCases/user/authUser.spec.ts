import { ValidatorInMemory } from "../../../../../test/utils/validatorInMemory"
import { AuthUserUseCase } from "./authUser"
import { validUser } from "../../../../../test/user/userData"
import { UserRepoInMemory } from "../../../../../test/repository/user"
import { EncryptorInMemory } from "../../../../../test/encryptor/encryptor"
import { JWTInMemory } from "../../../../../test/encryptor/jwt"
import { UserEmailInvalidError } from "../../errors/user/userEmailInvalid"
import { UserPasswordInvalidError } from "../../errors/user/userPasswordInvalid"
import { UserAuthError } from "../../errors/user/userAuthError"

describe("AuthUserUseCase tests", function(){

    const validator = new ValidatorInMemory([validUser.email])
    const userRepo = new UserRepoInMemory()
    const encryptor = new EncryptorInMemory()
    const jwt = new JWTInMemory()

    it("should be able authenticate with valid user", async function(){
        userRepo.user.push(validUser)
        const sut = new AuthUserUseCase(validator,userRepo,encryptor,jwt)
        const result = await sut.exec({
            email:validUser.email,
            password:validUser.password
        })
        expect(result.right).not.toEqual(undefined)
        userRepo.user.pop()
    })

    it("should be able return error if authenticate with invalid user", async function(){
        const sut = new AuthUserUseCase(validator,userRepo,encryptor,jwt)
        const result = await sut.exec({
            email:validUser.email,
            password:validUser.password
        })
        expect(result.left).toBeInstanceOf(UserAuthError)
    })

    it("should be able return error if authenticate with email null", async function(){
        const sut = new AuthUserUseCase(validator,userRepo,encryptor,jwt)
        const result = await sut.exec({
            email:undefined,
            password:"Testesfsdf"
        })
        expect(result.left).toBeInstanceOf(UserEmailInvalidError)
        userRepo.user.pop()
    })

    it("should be able return error if authenticate with password null", async function(){
        const sut = new AuthUserUseCase(validator,userRepo,encryptor,jwt)
        const result = await sut.exec({
            email:"test@gmail.com",
            password:undefined
        })
        expect(result.left).toBeInstanceOf(UserPasswordInvalidError)
        userRepo.user.pop()
    })

})