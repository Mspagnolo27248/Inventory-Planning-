import { useState } from "react";



interface Option {
    value: string;
    label: string;
  }

  

  export const useSelect = <T extends Record<string,any>>()=>{
    const [options,setOptions] = useState<Option[]>([]);
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);
    const setSelectOption =(option: Option | null) => setSelectedOption(option);
    function createOptions(array: T[],valueField:keyof T,generateLabel:(values:T)=>string): Option[] {
        return array.map((value) => {
          return {
            value: value[valueField],
            label: generateLabel(value)
          }
        })
      };


      return {options,selectedOption,createOptions,setSelectOption,setOptions}
  }