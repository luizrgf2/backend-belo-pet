import { JWTImp } from "src/app/app/interfaces/encryptor/jwt";

export class JWTInMemory implements JWTImp{
    encode<T = any>(data: T) : string{
        return "validtoken"
    }
    decode<T = any>(token: string) : T{
        return token as any
    }

}