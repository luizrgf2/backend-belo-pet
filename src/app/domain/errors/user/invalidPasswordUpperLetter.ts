
export class InvalidPasswordUpperLetterError extends Error{
    constructor(){
        super("A senha deve ter pelo menos uma letra maiúscula!")
    }
}