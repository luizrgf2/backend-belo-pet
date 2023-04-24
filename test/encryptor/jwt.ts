import { Either, Right } from "../../src/app/app/errors/either";
import { ErrorBase } from "src/app/app/errors/errorBase";
import { JWTImp } from "src/app/app/interfaces/encryptor/jwt";
import { validUser } from "../../test/user/userData";

export enum JWTTokenValidToTest{
    validUser="validUser"
}

export class JWTInMemory implements JWTImp{
    encode<T = any>(data: T) : string{
        return "validtoken"
    }
    decode<T = any>(token: string) : Either<ErrorBase,T>{
        if(token === JWTTokenValidToTest.validUser){
            return Right.create(validUser as any)
        }
        return Right.create({} as any)
    }

}