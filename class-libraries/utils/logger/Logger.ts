import { IApplicationLog } from "@/Interfaces/IApplicationLog";
import { postToApi } from "../fetch-helper/fetch-helper";
import { ILogger } from "@/Interfaces/ILogger";











export class Logger implements ILogger{
    private static instance: Logger | null = null; // Declare the instance property
    private endpoint:string;
    private constructor(endpoint:string){
        this.endpoint = endpoint;
    }
    
    public static getInstance(endpoint:string) {
        if(!this.instance){
            this.instance = new Logger(endpoint);
        }
        return this.instance;
    }
    
    async log(transaction:IApplicationLog){
        try{
            postToApi<IApplicationLog>(this.endpoint,transaction)
            return true
        } catch{
            return false
        }
                
      
    }
}