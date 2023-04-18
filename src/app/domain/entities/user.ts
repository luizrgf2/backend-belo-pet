import { InvalidNameError } from "../errors/invalidName";
import { InvalidEmailError } from "../errors/user/invalidEmail";
import { InvalidPasswordError } from "../errors/user/invalidPassword";
import { InvalidPasswordLenError } from "../errors/user/invalidPasswordLen";
import { InvalidPasswordUpperLetterError } from "../errors/user/invalidPasswordUpperLetter";

export interface UserInterface{
    name:string,
    email:string,
    password:string,
    createdAt:Date,
    updatedAt:Date,
    id:string
}

export class UserEntity{
    readonly user:UserInterface
    
    constructor(user:UserInterface){
        this.user = user
    }

    private checkEmailIsNull():Error|null{
        if(!this.user.email) return new InvalidEmailError()
        return null
    }

    private checkPasswordIsNull():Error|null{
        if(!this.user.password) return new InvalidPasswordError()
        return null
    }

    private checkNameIsNull():Error|null{
        if(!this.user.name) return new InvalidNameError()
        return null
    }

    private isValidEmail():Error|null{
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!regexEmail.test(this.user.email)){
            return new InvalidEmailError()
       }
       return null 
    }

    private isValidPasswordLen():Error|null{
        const regex = /^[a-zA-Z0-9]{8,15}$/; // Regex que valida se a senha tem de 8 a 15 caracteres alfanuméricos
        if(!regex.test(this.user.password)){
            return new InvalidPasswordLenError()
        }
        return null
    }

    private isValidPasswordHasUpperLetter():Error|null{
        const regex = /[A-Z]/; // Expressão regular que representa uma letra maiúscula
        if(!regex.test(this.user.password)){
            return new InvalidPasswordUpperLetterError()
        }
        return null
    }

    private isValidName():Error|null{
        if(this.user.name.length < 4 || this.user.name.length > 50){
            return new InvalidNameError()
        }
        return null
    }

    static create(user:Omit<UserInterface,"id"|"updatedAt"|"createdAt">):Error|UserEntity{
        const entity = new UserEntity({
            ...user,
            id:"",
            createdAt:new Date(),
            updatedAt:new Date()
        })

        const passwordIsNull = entity.checkPasswordIsNull()
        const nameIsNull = entity.checkNameIsNull()
        const emailIsNull = entity.checkPasswordIsNull()

        if(passwordIsNull) return passwordIsNull
        if(nameIsNull) return nameIsNull
        if(emailIsNull) return emailIsNull

        const validName = entity.isValidName()
        const validEmail = entity.isValidEmail()
        const validPasswordLen =  entity.isValidPasswordLen()
        const validPasswordHasUpperLetter = entity.isValidPasswordHasUpperLetter()


        if(validName) return validName
        if(validEmail) return validEmail
        if(validPasswordLen) return validPasswordLen
        if(validPasswordHasUpperLetter) return validPasswordHasUpperLetter

        return entity

    }
}