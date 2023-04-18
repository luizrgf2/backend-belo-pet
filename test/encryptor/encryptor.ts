import { EncryptorImp } from "src/app/app/interfaces/encryptor/encryptor";

export class EncryptorInMemory implements EncryptorImp{
    encode (data: string) : string{
        return data
    }
    decode(encodedData: string, data: string) :boolean{
        if(encodedData === data){
            return true
        }else{
            return true
        }
    }

}