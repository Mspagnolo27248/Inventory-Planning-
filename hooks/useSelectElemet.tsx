import { useState } from "react";
import Select from 'react-select';


interface Option {
    value: string;
    label: string;
  }
 

  export const useSelectElemet = <T extends Record<string,any>>()=>{
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

      const SelectElement = ()=>{
        return (
          <Select
          value={selectedOption}
          onChange={(option: Option | null) => setSelectedOption(option)}
          options={options || []}
          isClearable={true}
          id='custselet'
        />
        )
       }
      


      return {options,selectedOption,createOptions,setSelectOption,setOptions,SelectElement}
  }