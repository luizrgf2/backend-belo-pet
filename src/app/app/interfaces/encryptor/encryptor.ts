export interface EncryptorImp{
    encode:(data:string)=>string
    decode:(encodedData:string,data:string)=>boolean
}