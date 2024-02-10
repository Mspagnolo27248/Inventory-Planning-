import { useState } from "react";


type FilterFunction<T> = (data: T[], filterInputs: string[]) => T[];


export function useTableFilter<T extends Record<string,any>>(initialData: T[]): [T[], string[], FilterFunction<T>] {
    const [filteredData, setFilteredData] = useState<T[]>(initialData);
    const [filterInputs, setFilterInputs] = useState<string[]>([]);
  
    // Function to filter data based on filter inputs
    const filterData: FilterFunction<T> = (data, inputs) => {
      const filtered = data.filter(item => {
        // Filter logic: check if any property contains input value
        return inputs.every(input => {
          return Object.values(item).some(value => {
            return String(value).toLowerCase().includes(input.toLowerCase());
          });
        });
      });
      setFilteredData(filtered);
      setFilterInputs(inputs);
      return filtered;
    };
  
    return [filteredData, filterInputs, filterData];
}