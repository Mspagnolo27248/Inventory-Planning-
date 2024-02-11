export interface IApplicationLog{
    id?:number;
    User:string;
    DateTime:string;   
    Action:LogActions;
    Message:string;
    Status?:"sucess"|"failed"
}


export enum LogActions  {
    LOGIN='LOGIN',
    LOGOUT="LOGOUT",
    PROCESS_START="PROCESS_START",
    PROCESS_END="PROCESS_END",
    ERROR="ERROR"
}