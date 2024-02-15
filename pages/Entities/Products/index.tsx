import { getFromApi } from "@/class-libraries/utils/fetch-helper/fetch-helper";
import { useAlert } from "@/contexts/Alert/AlertContext";
import useSort from "@/hooks/useArraySort";
import React, { SetStateAction, useEffect, useState } from "react";
import { RiseLoader } from "react-spinners";
import classes from "./Products.module.css";
import { useSelectElemet } from "@/hooks/useSelectElemet";
import { distinctValuesOfProperty } from "@/class-libraries/utils/dto-helper/dto-helper";
import useTableFilter from "@/hooks/useArrayFilter";




const handleInputChange = <T,>(columnName: keyof T, value: string,setStateFunction:React.Dispatch<React.SetStateAction<T>>) => {
  setStateFunction((prev) => ({
    ...prev,
    [columnName]: value,
  }));
};

export default function Products() {
  const productsUrl = process.env.NEXT_PUBLIC_BACKEND_PRODUCTS;
  const [isloading, setIsLoading] = useState(false);
  const { danger, success, warning } = useAlert();
  const [tableData, setTableData] = useState<IProducts[]>([] as IProducts[]);
  //const [filters, setFilters] = useState<FilterStateObject<IProducts>>({} as FilterStateObject<IProducts>); //move to customer hook
  const [dataKeys, setDataKeys] = useState<Array<keyof IProducts>>([]);
  const selectHook = useSelectElemet();

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
  }, []);

  useEffect(() => { //Create Distinct List of Product Class
    const productClassList = distinctValuesOfProperty(
      tableData,
      "ClassCode"
    ).map((item, idx) => ({ id: idx, desc: item }));
    const classDropDownOptions = selectHook.createOptions(
      productClassList,
      "id",
      (item) => item.desc
    );
    selectHook.setOptions(classDropDownOptions);
  }, [tableData]);


  const { /*useFilter Hook */ 
    filteredData,
    filters,
    setFilters,
    resetFilters,
  } = useTableFilter(tableData);


  const { /*useSort Hook*/ 
   sortedData,
    sortedColumn,
    sortDirection,
    handleSort,
    getSortIndicator,
  } = useSort<IProducts>(filteredData);


  return (
    <div className={classes.page}>
      <section>
        <h1>Product Master</h1>
      </section>

      <section>
        <p>form controls...</p>

        <button onClick={resetFilters}>clear all</button>
      </section>
      <div>
        <RiseLoader loading={isloading} />
        <selectHook.SelectElement />
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
                      onChange={(e) =>
                        handleInputChange(key, e.target.value, setFilters)
                      }
                      value={filters[key]}
                    />
                  </td>
                ))}
              </tr>
              {sortedData!.map((item) => (
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



// type FilterStateObject<T> = {
//   [K in keyof T]: string;
// };

// function filterArray<T>(array: T[], filters: FilterStateObject<T>): T[] {
//   return array.filter(item => {
//     return Object.keys(filters).every(key => {
//       const filterValue = filters[key as keyof T];
//       if (filterValue === undefined) return true;
//       return String(item[key as keyof T]).toLowerCase().includes(filterValue.toLowerCase());
//     });
//   });
// }

// const resetFilters = <T,>(prev:FilterStateObject<T>) => {
//   const output = {...prev};
//  for(const key of Object.keys(prev)){
//   output[key as keyof T] = '';
//  }
//  return output;
// }

// const handleInputChange = <T,>(columnName: keyof T, value: string,setStateFunction:React.Dispatch<React.SetStateAction<T>>) => {
//   setStateFunction((prev) => ({
//     ...prev,
//     [columnName]: value,
//   }));
// };
