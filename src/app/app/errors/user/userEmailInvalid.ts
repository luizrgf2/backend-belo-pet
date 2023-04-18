import { InvalidEmailError } from "../../../domain/errors/user/invalidEmail";
import { ErrorBase } from "../errorBase";

export class UserEmailInvalidError extends ErrorBase{
    constructor(){
        super(new InvalidEmailError().message,400)
    }
}