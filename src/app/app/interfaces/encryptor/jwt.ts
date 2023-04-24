import { Either } from "../../errors/either"
import { ErrorBase } from "../../errors/errorBase"

export interface JWTImp{
    encode:<T=any>(data:T)=>string
    decode:<T=any>(token:string)=>Either<ErrorBase,T>
}