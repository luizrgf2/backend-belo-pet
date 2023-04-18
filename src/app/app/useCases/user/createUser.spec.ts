import { UserRepoInMemory } from "../../../../../test/repository/user"
import { CreateUserUseCase } from "./createUser"
import { invalidUserWithEmailInvalid, invalidUserWithEmailNull, invalidUserWithNameNull, invalidUserWithPasswordNull, validUser } from "../../../../../test/user/userData"
import { UserExistsError } from "../../errors/user/userExists"
import { UserEmailInvalidError } from "../../errors/user/userEmailInvalid"
import { EncryptorInMemory } from "../../../../../test/encryptor/encryptor"
import { ValidatorInMemory } from "../../../../../test/utils/validatorInMemory"
import { ErrorBase } from "../../errors/errorBase"

describe("createUserUseCase tests", function(){

    const userRepo = new UserRepoInMemory()
    const encryptor = new EncryptorInMemory()
    const fieldsValidator = new ValidatorInMemory([validUser.email])
    
    
    it("should be able to create valid user", async function(){
        const sut = new CreateUserUseCase(userRepo,encryptor,fieldsValidator)
        const result = await sut.exec({
            user:validUser
        })
        expect(result.right).not.toEqual(undefined)
    })

    it("should be able return error if try create user with email exists", async function(){
        const sut = new CreateUserUseCase(userRepo,encryptor,fieldsValidator)
        const result = await sut.exec({
            user:validUser
        })
        expect(result.left).toBeInstanceOf(UserExistsError)
    })

    it("should be able return error if try create user with email invalid", async function(){
        const sut = new CreateUserUseCase(userRepo,encryptor,fieldsValidator)
        const result = await sut.exec({
            user:invalidUserWithEmailInvalid
        })
        expect(result.left).toBeInstanceOf(UserEmailInvalidError)
    })

    it("should be able return error if try create user with email null", async function(){
        const sut = new CreateUserUseCase(userRepo,encryptor,fieldsValidator)
        const result = await sut.exec({
            user:invalidUserWithEmailNull
        })
        expect(result.left).toBeInstanceOf(ErrorBase)  
    })

    it("should be able return error if try create user with name null", async function(){
        const sut = new CreateUserUseCase(userRepo,encryptor,fieldsValidator)
        const result = await sut.exec({
            user:invalidUserWithNameNull
        })
        expect(result.left).toBeInstanceOf(ErrorBase)  
    })

    it("should be able return error if try create user with password null", async function(){
        const sut = new CreateUserUseCase(userRepo,encryptor,fieldsValidator)
        const result = await sut.exec({
            user:invalidUserWithPasswordNull
        })
        expect(result.left).toBeInstanceOf(ErrorBase)  
    })

})