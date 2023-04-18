import { UserRepoInMemory } from "../../../../../test/repository/user"
import { CreateUserUseCase } from "./createUser"
import { invalidUserWithEmailInvalid, validUser } from "../../../../../test/user/userData"
import { UserExistsError } from "../../errors/user/userExists"
import { ValidatorInMemory } from "../../../../../test/utils/validatorInMemory"
import { UserEmailInvalidError } from "../../errors/user/userEmailInvalid"

describe("createUserUseCase tests", function(){

    const userRepo = new UserRepoInMemory()
    const validatorFields = new ValidatorInMemory([validUser.email])
    
    
    it("should be able to create valid user", async function(){
        const sut = new CreateUserUseCase(userRepo,validatorFields)
        const result = await sut.exec({
            user:validUser
        })
        expect(result.right).not.toEqual(undefined)
    })

    it("should be able return error if try create user with email exists", async function(){
        const sut = new CreateUserUseCase(userRepo,validatorFields)
        const result = await sut.exec({
            user:validUser
        })
        expect(result.left).toBeInstanceOf(UserExistsError)
    })

    it("should be able return error if try create user with email invalid", async function(){
        const sut = new CreateUserUseCase(userRepo,validatorFields)
        const result = await sut.exec({
            user:invalidUserWithEmailInvalid
        })
        console.log(result.left)
        expect(result.left).toBeInstanceOf(UserEmailInvalidError)
    })

})