
import { getFromApi } from "@/class-libraries/utils/fetch-helper/fetch-helper";
import { useAlert } from "@/contexts/Alert/AlertContext";
import useSort from "@/hooks/useSort";
import React, { useEffect, useState } from "react";
import { RiseLoader } from 'react-spinners';

interface Idata {
  name: String;
  age: Number;
  active: Boolean;
}

type SortFields<T>  = {
  field: keyof T;
  direction: "asc|desc";
}

type TableField<T>  = {
  field: keyof T;
  filter: String | Number | Boolean;
}


export default function Products() {
  const productsUrl = process.env.NEXT_PUBLIC_BACKEND_PRODUCTS;
  const { danger, success, warning } = useAlert();

  /*State Variable*/
  const [tableData, setTableData] = useState<IProducts[]>();


  const indexedData: [string, IProducts][] |undefined = tableData?.map((item,idx)=>[String(idx),item])
    const {
      sortedData,
      sortedColumn,
      sortDirection,
      handleSort,
      getSortIndicator,
    } = useSort<IProducts>(indexedData); // Initially sort by name in ascending order
  
  

  /*Conditonal States*/
  const [isloading, setIsLoading] = useState(false);

  /*Variables */

  /*Page Load*/
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFromApi<IProducts[]>(productsUrl!);
        setTableData(data);
      } catch (error: any) {
        danger(error.message);
      }
    };
    fetchData();
  }, );

  return (
    <div>
      <section>
        <h1>Product Master</h1>
      </section>

      <section>
        <p>form controls...</p>
      </section>
      <div>
        <RiseLoader loading={isloading} />

        {tableData && tableData.length > 0 ? (
          <table>
            <thead>
              <tr>
                {Object.keys(tableData[0]).map(key=>(<th key={key} onClick={()=>handleSort(key as keyof IProducts)}>{key}</th>))}
              </tr>
              </thead>
              <tbody>          
            {sortedData!.map(([key,item]) => (
              <tr key={key}>
              {Object.entries(item).map(([key,value])=>(
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
