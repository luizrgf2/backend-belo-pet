import { ErrorBase } from "../errorBase";

export class UserConfirmationTokenInvalidError extends ErrorBase{
    constructor(){
        super("Token de confirmação de email inválido!",401)
    }
}