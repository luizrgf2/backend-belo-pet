export class InvalidNameError extends Error{
    constructor(){
        super("Nome inválido, o nome deve ter entre 4 e 50 caracteres!")
    }
}