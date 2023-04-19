import { InvalidPasswordError } from "../../../domain/errors/user/invalidPassword";
import { ErrorBase } from "../errorBase";

export class UserPasswordInvalidError extends ErrorBase{
    constructor(){
        super(new InvalidPasswordError().message,400)
    }
}