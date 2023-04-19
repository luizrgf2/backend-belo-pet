import { ErrorBase } from "../errorBase";

export class UserNotExistsError extends ErrorBase{
    constructor(){
        super("Usuário não existe!",404)
    }
}