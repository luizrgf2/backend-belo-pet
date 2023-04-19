import { ErrorBase } from "../errorBase";

export class UserAuthError extends ErrorBase{
    constructor(){
        super("Email ou senha errado!",401)
    }
}