import { Either, Right } from "../../src/app/app/errors/either";
import { ErrorBase } from "../../src/app/app/errors/errorBase";
import { EmailControllerImp } from "../../src/app/app/interfaces/utils/EmailController";

export class EmailControllerInMemory implements EmailControllerImp{
    async sendEmailConfirmation (emailToSend: string) : Promise<Either<ErrorBase, void>>{
        return Right.create(undefined)
    }

    async sendEmailToChangePassword (email: string) : Promise<Either<ErrorBase, void>>{
        return Right.create(undefined)

    }



}