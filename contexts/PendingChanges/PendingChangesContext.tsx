import React, { createContext, useContext, useState, ReactNode,useEffect } from 'react';


interface PendingChangesContextType {
  hasPendingChanges: boolean;
  togglePendingChanges: (isPending?:boolean) => void;
}

const PendingChangesContext = createContext<PendingChangesContextType|undefined>(undefined);

export function usePendingChanges() {
    const context = useContext(PendingChangesContext);
    if (!context) {
      throw new Error('usePendingChanges must be used within a PendingChangesProvider');
    }
    return context;
  };
  

interface PendingChangesProviderProps {
  children: ReactNode;
}

export const PendingChangesProvider: React.FC<PendingChangesProviderProps> = ({
  children,
}: PendingChangesProviderProps) => {
  const [hasPendingChanges, setHasPendingChanges] = useState(false);

  const togglePendingChanges = (isPending?:boolean) => {
    if(isPending===undefined){
        setHasPendingChanges((prev) => !prev);
    } else{
        setHasPendingChanges(isPending);
    }
    
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasPendingChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasPendingChanges]);

  return (
    <PendingChangesContext.Provider value={{ hasPendingChanges, togglePendingChanges }}>
      {children}
    </PendingChangesContext.Provider>
  );
};

