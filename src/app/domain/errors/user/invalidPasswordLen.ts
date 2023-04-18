export class InvalidPasswordLenError extends Error{
    constructor(){
        super("A senha deve ter de 8 a 15 caracteres!")
    }
}