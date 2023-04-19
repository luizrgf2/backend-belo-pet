export interface JWTImp{
    encode:<T=any>(data:T)=>string
    decode:<T=any>(token:string)=>T
}