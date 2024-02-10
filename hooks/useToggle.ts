import { useState } from "react";



export function useToggle(initialValue: boolean) {
  const [value, setVariable] = useState(initialValue);

  const toggleValue = (explicitChange?: boolean) => {
    setVariable(explicitChange ?? !value);
  };

  return [value, toggleValue] as const;
}