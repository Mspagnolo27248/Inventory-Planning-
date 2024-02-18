import { useMemo, useState } from "react";


type FilterStateObject<T> = {
  [K in keyof T]: string;
};

function generateInitialFilters<T>(dataKeys: Array<keyof T>): FilterStateObject<T> {
  const initialFilters: FilterStateObject<T> = {} as FilterStateObject<T>;
  dataKeys.forEach(key => {
    initialFilters[key] = '';
  });
  return initialFilters;
}


function filterArrayOfObjects<T>(array: T[], filters: FilterStateObject<T>): T[] {

    return array.filter(item => {
      return Object.keys(filters).every(key => {
        const filterValue = filters[key as keyof T];
        if (filterValue === undefined) return true;
        return String(item[key as keyof T]).toLowerCase().includes(filterValue.toLowerCase());
      });
    });

 
  
}


const setObjectValuesToEmptyString = <T,>(prev:FilterStateObject<T>) => {
  const output = {...prev};
  for(const key of Object.keys(prev)){
  output[key as keyof T] = '';
  }
  return output;
}



 function useTableFilter<T extends Record<string,any>>(initialData: T[]) {
  const [dataKeys, setDataKeys] = useState<Array<keyof T>>([]);
  const [filters, setFilters] = useState<FilterStateObject<T>>(generateInitialFilters<T>(dataKeys)); 
  

  const filteredData = useMemo(()=>filterArrayOfObjects(initialData,filters),[initialData,filters])

  const resetFilters= ():void=> setFilters((prev)=>(setObjectValuesToEmptyString<FilterStateObject<T>>(prev)));
  

  const handleInputChange = (columnName: keyof T, value:string) => {
    setFilters(({
      ...filters,
      [columnName]: value,
    }));
  };

  // const updateFilters = (item:FilterStateObject<T>)=>{
  //   setFilters((prev)=>({     
  //       ...prev,
  //       ...item, 
  //   }))
  // };

    return {filters,filteredData,handleInputChange,resetFilters};
}

export default useTableFilter;

//Example Usage 
//const {filteredData, filters,setFilters,resetFilters} = useFilter()