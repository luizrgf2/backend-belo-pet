import { Either } from "../../errors/either";
import { ErrorBase } from "../../errors/errorBase";

export interface EmailControllerImp{
    sendEmailConfirmation:(emailToSend:string)=>Promise<Either<ErrorBase,void>>
    sendEmailToChangePassword:(email:string)=>Promise<Either<ErrorBase,void>>
}