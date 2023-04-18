import { ErrorBase } from "../errorBase";

export class UserNotExists extends ErrorBase{
    constructor(){
        super("Usuário não existe!",404)
    }
}