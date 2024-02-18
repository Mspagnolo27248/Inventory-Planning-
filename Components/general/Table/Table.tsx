import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import useTableFilter from '@/hooks/useArrayFilter';
import useSort from '@/hooks/useArraySort';
import { AiOutlineDownload } from 'react-icons/ai';


export type ColumnConfig<U> = {
    name: keyof U;
    friendlyName?: string;
    formatter?: (row: U,index:number) => ReactNode;
    isSortable?: boolean;
    isFilterable?: boolean;
}

interface TableProps<T extends Record<string,any>> {
    data: T[];
    columns: ColumnConfig<T>[];
}



const Table: React.FC<TableProps<any>> = <T extends Record<string,any>,>({
    data,
    columns,
}: TableProps<T>
) => {
    const [tableData, setTableData] = useState<T[]>(data);
    const tableHeaderRef = useRef<HTMLTableRowElement>(null);


    useEffect(()=>{
        setTableData([...data])
    },[data])


    const { /*useFilter Hook */ 
    filteredData,
    filters,
    handleInputChange,
    resetFilters,
  } = useTableFilter<T>(tableData);


  const { /*useSort Hook*/ 
   sortedData,
    sortedColumn,
    sortDirection,
    handleSort,
    getSortIndicator,
  } = useSort<T>(filteredData);

        
    
    //Uses the 'file-saver' package to export table to csv.
    const handleExport = () => {
        const csvData = Papa.unparse(tableData, {
            columns: columns.map((col) => col.name as string),
        });
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
        saveAs(blob, 'table.csv');
    };

    return (
        <div>
            <div>
                <button onClick={resetFilters}>Clear Filters</button>   
                <AiOutlineDownload onClick={handleExport} size={24}></AiOutlineDownload></div>
            <div>
                
    
            <table>
                <thead>
                    <tr ref={tableHeaderRef}>
                        {columns.map((headerConfig, idx) => {

                            return (
                                <th key={idx} onClick={() => handleSort(headerConfig.name)}>
                                {String(headerConfig.friendlyName??headerConfig.name)}
                                {getSortIndicator(headerConfig.name)}
                              </th>
                            )
                        })}
                    </tr>
                 
                    <tr>
                    {columns.map((headerConfig,idx) => (
                  <td key={String(headerConfig.name)}>
                    <input
                      type="search"
                      onChange={(e) =>
                        handleInputChange(headerConfig.name, e.target.value)
                      }
                      value={filters[headerConfig.name]||''}
                    />
                  </td>
                ))}
                    </tr>
                </thead>
                <tbody>
                    {sortedData!.map((record, rowIndex) => {
                        return (
                            <tr key={rowIndex}>
                                {columns.map((col, idx) => {
                                    return col.formatter ? (<td key={idx}>{col.formatter(record,rowIndex)}</td>
                                    ) : (<td key={idx}>{String(record[col.name])}</td>
                                    );
                                })}
                            </tr>
                        );
                    })}</tbody>
            </table>
            </div>
           
        </div>
    )
}


export default Table

