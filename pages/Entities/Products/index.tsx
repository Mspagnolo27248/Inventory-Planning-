import { getFromApi } from "@/class-libraries/utils/fetch-helper/fetch-helper";
import { useAlert } from "@/contexts/Alert/AlertContext";
import useSort from "@/hooks/useSort";
import React, { SetStateAction, useEffect, useState } from "react";
import { RiseLoader } from "react-spinners";
import classes from "./Products.module.css";

type FilterStateObject<T> = {
  [K in keyof T]: string;
};


export default function Products() {
  const productsUrl = process.env.NEXT_PUBLIC_BACKEND_PRODUCTS;
  const { danger, success, warning } = useAlert();
  const [tableData, setTableData] = useState<IProducts[]>();
  const [filters, setFilters] = useState<FilterStateObject<IProducts>>({} as FilterStateObject<IProducts>);
  const [dataKeys, setDataKeys] = useState<Array<keyof IProducts>>([]);

  const indexedData: [string, IProducts][] | undefined = tableData?.map(
    (item, idx) => [String(idx), item]
  );

  const {
    sortedData,
    sortedColumn,
    sortDirection,
    handleSort,
    getSortIndicator,
  } = useSort<IProducts>(indexedData);


  const handleInputChange = (columnName: keyof IProducts, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [columnName]: value,
    }));
  };



  
  /*Conditonal States*/
  const [isloading, setIsLoading] = useState(false);



  /*Page Load*/
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getFromApi<IProducts[]>(productsUrl!);
        //Check for id field if not add one. 
        setTableData(data);
        setDataKeys(Object.keys(data[0]) as Array<keyof IProducts>);
      } catch (error: any) {
        danger(error.message);
      }
      setIsLoading(false);
    };
    fetchData();
  },[]);

let filteredData = sortedData?.map(([key,value])=>value);

if(filters&&sortedData){
filteredData = filterArray<IProducts>(sortedData.map(([key,value])=>value),filters);
};

function filterArray<T>(array: T[], filters: FilterStateObject<T>): T[] {
  return array.filter(item => {
    // Check if all filter conditions are satisfied for the current item
    return Object.keys(filters).every(key => {
      const filterValue = filters[key as keyof T];
      // Skip filtering if the filter value is undefined
      if (filterValue === undefined) return true;
      // Perform case-insensitive string matching for filter values
      return String(item[key as keyof T]).toLowerCase().includes(filterValue.toLowerCase());
    });
  });
}


const resetFilters= (prev:FilterStateObject<IProducts>) => {
  const output = {...prev};
 for(const key of Object.keys(prev)){
  output[key as keyof IProducts] = '';
 }
 return output;
}



  return (
    <div className={classes.page}>
      <section>
        <h1>Product Master</h1>
      </section>

      <section>
        <p>form controls...</p>
        <button onClick={()=>{setFilters((prev)=>(resetFilters(prev)))}}>clear all</button>
      </section>
      <div>
        <RiseLoader loading={isloading} />

        {tableData && tableData.length > 0 ? (
          <table>
            <thead>
              <tr>
                {dataKeys.map((key) => (
                  <th key={key} onClick={() => handleSort(key)}>
                    {key}
                    {getSortIndicator(key)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {dataKeys.map((key) => (
                  <td key={key}>
                    <input 
                      type="search"
                      onChange={(e) => handleInputChange(key, e.target.value)}
                      value={filters[key]}
                    />
                  </td>
                ))}
              </tr>
              {filteredData!.map((item) => (
                <tr key={item.id}>
                  {Object.entries(item).map(([key, value]) => (
                    <td key={key}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No Data</p>
        )}
      </div>
    </div>
  );
}


/* How to type an object using the keys of another object**/
  // useEffect(() => {
  //   if (tableData) {
  //     // Extract headers from tableData
  //     const headersFromData = tableData[0];
  //     const initializedHeaders: {[key in keyof IProducts]:string} = {} as any;
  //     for (const key in headersFromData) {
  //       initializedHeaders[key as keyof IProducts] = '';
  //     }

  //     // Update the state with the initialized headers
  //     setTableFilters(initializedHeaders);
  //   }
  // }, [tableData]);
