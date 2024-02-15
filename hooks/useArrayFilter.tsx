import { useMemo, useState } from "react";


type FilterStateObject<T> = {
  [K in keyof T]: string;
};


function filterArrayOfObjects<T>(array: T[]|undefined, filters: FilterStateObject<T>): T[]|undefined {
  if(array){
    return array.filter(item => {
      return Object.keys(filters).every(key => {
        const filterValue = filters[key as keyof T];
        if (filterValue === undefined) return true;
        return String(item[key as keyof T]).toLowerCase().includes(filterValue.toLowerCase());
      });
    });
  }
  
}


const setObjectValuesToEmptyString = <T,>(prev:FilterStateObject<T>) => {
  const output = {...prev};
  for(const key of Object.keys(prev)){
  output[key as keyof T] = '';
  }
  return output;
}



 function useTableFilter<T extends Record<string,any>>(initialData: T[]|undefined) {
  const [filters, setFilters] = useState<FilterStateObject<T>>({} as FilterStateObject<T>); 
  

  const filteredData = useMemo(()=>filterArrayOfObjects(initialData,filters),[initialData,filters])

  const resetFilters= ():void=> setFilters((prev)=>(setObjectValuesToEmptyString<FilterStateObject<T>>(prev)));
  
  // const updateFilters = (item:FilterStateObject<T>)=>{
  //   setFilters((prev)=>({     
  //       ...prev,
  //       ...item, 
  //   }))
  // };

    return {filteredData, filters,setFilters,resetFilters};
}

export default useTableFilter;

//Example Usage 
//const {filteredData, filters,setFilters,resetFilters} = useFilter()