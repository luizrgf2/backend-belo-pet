import { ErrorBase } from "../errorBase";

export class UserExistsError extends ErrorBase{
    constructor(){
        super("O usuário já existe!",409)
    }
}