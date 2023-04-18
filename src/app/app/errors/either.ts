export class Right<T=any>{
    left:undefined
    right:T

    constructor(value:T){
        this.right = value
    }

    static create<T>(value:T){
        return new Right<T>(value)
    }
}

export class Left<T=any>{
    left:T
    right:undefined

    constructor(value:T){
        this.left = value
    }

    static create<T>(value:T){
        return new Left<T>(value)
    }
}

export type Either<L,R> = Left<L>|Right<R>