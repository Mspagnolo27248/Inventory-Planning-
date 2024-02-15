import { useState } from "react";
import Select from 'react-select';

  /**
 * Represents an option object for the Select component.
 * @typedef {Object} Option
 * @property {string} value - The value of the option.
 * @property {string} label - The label of the option.
 */
interface Option {
    value: string;
    label: string;
  }
 

/**
 * Custom hook for managing a Select component's state.
 * @template T - Generic type for the array items.
 * @returns {Object} An object containing state variables and functions for managing a Select component.
 */
  export const useSelectElemet = <T extends Record<string,any>>()=>{
    const [options,setOptions] = useState<Option[]>([]);
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);
    
      /**
     * Function to set the selected option.
     * @param {Option | null} option - The option to be set as selected.
     */
    const setSelectOption =(option: Option | null) => setSelectedOption(option);
    
       /**
     * Function to create options for the Select component.
     * @param {T[]} array - Array of items to generate options from.
     * @param {keyof T} valueField - The field in the array items to use as the value for the options.
     * @param {function(T): string} generateLabel - Function to generate labels for the options.
     * @returns {Option[]} Array of options generated from the provided array.
     */
    function createOptions(array: T[],valueField:keyof T,generateLabel:(values:T)=>string): Option[] {
        return array.map((value) => {
          return {
            value: value[valueField],
            label: generateLabel(value)
          }
        })
      };

          /**
     * Functional component for the Select element.
     * @returns {JSX.Element} JSX element representing the Select component.
     */
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