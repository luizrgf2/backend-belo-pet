import { FieldsValidator } from "src/app/app/interfaces/validators/fieldsValidator";

export class ValidatorInMemory implements FieldsValidator{

    emailToaccept:string[]

    constructor(emails:string[]){
        this.emailToaccept = emails
    }

    isValidEmail(email: string) : boolean{
        if(this.emailToaccept.find(item=>item === email)){
            return true
        }else{
            return false
        }
    }

}