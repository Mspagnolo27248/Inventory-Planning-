
import { ILogger } from '@/Interfaces/ILogger';
import { Logger } from '@/class-libraries/utils/logger/Logger';
import React, {ReactNode, createContext,useContext} from 'react';

const LoggerContext = createContext<ILogger|null>(null); //Create a new context that will be of type Logger or null, set to null.


export const useLogger = () =>{ //Create customer hook that will allow the user to interacte with the Logger instance inside LoggerContext.
    const logger = useContext(LoggerContext); // at this point the context is null;
    if(!logger){
        throw new Error('useLogger must be used within a Logger Provider');
    }
return logger;
}


//Define LoggerProvider Types
type LoggerProviderType = {
apiUrl:string;
children:ReactNode;
}

//Provder is the HOC that returns the Logger.Context (which is a react context) and allows the children to pass through. 
// A logger provider component will need to wrap the application to use useLogger() custom hook. You'll need to specify the apiUrl
export const LoggerProvider = ({apiUrl,children}:LoggerProviderType)=>{ // This is the wrapper component that you can pass variable through, it returns an HOC.
    
    const logger =  Logger.getInstance(apiUrl); //Get the singlton instance of logger. 

    return(
        <LoggerContext.Provider value={logger}>
        {children}
      </LoggerContext.Provider>
    )
}