import { FieldsValidator } from "src/app/app/interfaces/validators/fieldsValidator";

export class ValidatorInMemory implements FieldsValidator{

    emailToaccept:string[]

    constructor(emails:string[]){
        this.emailToaccept = emails
    }

    isValidEmail(email: string) : boolean{
        const isValid = this.emailToaccept.includes(email)
        return isValid
    }

}