import { invalidUserWithEmailInvalid, invalidUserWithEmailNull, invalidUserWithNameNull, invalidUserWithPasswordLenInvalid, invalidUserWithPasswordNull, invalidUserWithPasswordUpperCaseInvalid, validUser } from "../../../../test/user/userData"
import { InvalidNameError } from "../errors/invalidName"
import { InvalidEmailError } from "../errors/user/invalidEmail"
import { InvalidPasswordError } from "../errors/user/invalidPassword"
import { InvalidPasswordLenError } from "../errors/user/invalidPasswordLen"
import { InvalidPasswordUpperLetterError } from "../errors/user/invalidPasswordUpperLetter"
import { UserEntity } from "./user"

describe("tests to userEntity", function(){


    it("should be able create valid userEntity", function(){
        const userData = validUser
        const sut = UserEntity.create(userData)
        expect(sut).not.toBeInstanceOf(Error)
    })

    it("should be able to return an error if the email is invalid", function(){
        const userData = invalidUserWithEmailInvalid
        const sut = UserEntity.create(userData)
        expect(sut).toBeInstanceOf(InvalidEmailError)
    })

    it("should be able to return an error if the password lenght is invalid", function(){
        const userData = invalidUserWithPasswordLenInvalid
        const sut = UserEntity.create(userData)
        expect(sut).toBeInstanceOf(InvalidPasswordLenError)
    })

    it("should be able to return an error if the password upper letter is invalid", function(){
        const userData = invalidUserWithPasswordUpperCaseInvalid
        const sut = UserEntity.create(userData)
        expect(sut).toBeInstanceOf(InvalidPasswordUpperLetterError)
    })

    it("should be able to return an error if the password if null", function(){
        const userData = invalidUserWithPasswordNull
        const sut = UserEntity.create(userData)
        expect(sut).toBeInstanceOf(InvalidPasswordError)
    })

    it("should be able to return an error if the email if null", function(){
        const userData = invalidUserWithEmailNull
        const sut = UserEntity.create(userData)
        expect(sut).toBeInstanceOf(InvalidEmailError)
    })


    it("should be able to return an error if the name if null", function(){
        const userData = invalidUserWithNameNull
        const sut = UserEntity.create(userData)
        expect(sut).toBeInstanceOf(InvalidNameError)
    })

})