import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import TableDropDown from './TableDropDown';

export type ColumnConfig<U> = {
    name: keyof U;
    friendlyName?: string;
    formatter?: (row: U,index:number) => ReactNode;
    isSortable?: boolean;
    isFilterable?: boolean;
}

interface StandardTableProps<T> {
    data: T[];
    columns: ColumnConfig<T>[];
}

type SortConfig<T> = {
    key: keyof T;
    direction: 'ascending' | 'descending';
};

const StandardTable: React.FC<StandardTableProps<any>> = <T,>({
    data,
    columns,
}: StandardTableProps<T>
) => {

    const [tableData, setTableData] = useState(data);
    const [sortConfig, setSortConfig] = useState<SortConfig<T>>({} as SortConfig<T>);
    const [visibleDropDowns, setVisibleDropDowns] = useState<{ [columnName: string]: boolean }>({});
    const tableHeaderRef = useRef<HTMLTableRowElement>(null);
    const [filterColumn, setFilterColumn] = useState<keyof T>();
    const [filterValue, setFilterValue] = useState('');

    //Re-populate data whenever it changes ie search new product
    useEffect(() => {
        setTableData(data);
    }, [data]);

    //Allow user to filter
        let filterData = [...tableData];



    //Allows user to sort columns with the  ascending or descending. 
    const sortHandler = (key: keyof T, direction: "ascending" | "descending") => {
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        let config: SortConfig<T> = { key, direction };
        setSortConfig(config);
    };


    //Sort Data based on the fields listed in sortConfig
    const sortedData = [...filterData].sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (sortConfig.direction === 'ascending') {
            return aValue > bValue ? 1 : -1;
        }
        if (sortConfig.direction === 'descending') {
            return aValue < bValue ? 1 : -1;
        }
        return 0;
    });


    //Show/Hide the table options dropdown when user clicks column header
    const showTableDropDownHandler = (columnName: string) => {
        setVisibleDropDowns((prevVisibleDropDowns) => ({
            [columnName]: !prevVisibleDropDowns[columnName],
        }));
        setFilterColumn(columnName as keyof T);
    }

    const closeDropDown = (e: MouseEvent) => {
        const targetElement = e.target as HTMLElement;
        if (targetElement == tableHeaderRef.current || (tableHeaderRef.current && tableHeaderRef.current.contains(targetElement))) {
            return;
        } else {
            setVisibleDropDowns({});
        }
    };



    useEffect(() => {
        document.body.addEventListener('click', closeDropDown);

        return () => {
            document.body.removeEventListener('click', closeDropDown);
        };
    }, []);


 

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

            <table>
                <thead>
                    <tr ref={tableHeaderRef}>
                        {columns.map((header, idx) => {

                            return <th key={idx} onClick={() => { showTableDropDownHandler(header.name as string) }}>
                                {header.friendlyName ? header.friendlyName : String(header.name)}
                                {sortConfig.key === header.name && (sortConfig.direction === 'ascending' ? ' ▲' : ' ▼')}
                                {visibleDropDowns[header.name.toString()] && <TableDropDown
                                    sortAscendingHandler={() => sortHandler(header.name, 'ascending')}
                                    sortDescendingHandler={() => sortHandler(header.name, 'descending')}
                                    exportHandler={() => handleExport()}
                                    setInputHandler={setFilterValue}

                                />}
                            </th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((record, rowIndex) => {
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
    )
}


export default StandardTable

