import { ErrorBase } from "../errorBase";

export class UserConfirmationEmailError extends ErrorBase{
    constructor(){
        super("Erro para confirmar o seu email!",500)
    }
}