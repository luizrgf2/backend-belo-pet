import { UserConfirmationTokenInvalidError } from "../../errors/user/userConfirmationTokenInvalid"
import { UserRepoInMemory } from "../../../../../test/repository/user"
import { JWTInMemory, JWTTokenValidToTest } from "../../../../../test/encryptor/jwt"
import { validUser } from "../../../../../test/user/userData"
import { ConfirmEmailUseCase } from "./confirmEmail"


describe("CorfirmEmailUseCase tests", function(){

    const userRepo = new UserRepoInMemory()
    const jwt = new JWTInMemory()

    userRepo.user.push(validUser)


    it("should be able confirm valid user with valid token", async function(){
        const sut = new ConfirmEmailUseCase(jwt,userRepo)
        const result = await sut.exec({
            token:JWTTokenValidToTest.validUser
        })
        expect(result.left).toBeUndefined()
        expect(userRepo.user[0].emailConfirmation).toBe(true)
    })

    it("should be able return error if try confirm user with invalid token", async function(){
        const sut = new ConfirmEmailUseCase(jwt,userRepo)
        const result = await sut.exec({
            token:"invalidToken"
        })
        expect(result.left).toBeInstanceOf(UserConfirmationTokenInvalidError)
    })

})