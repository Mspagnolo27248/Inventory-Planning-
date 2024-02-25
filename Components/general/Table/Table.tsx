import React, { ReactNode, useEffect, useRef, useState } from "react";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import useTableFilter from "@/hooks/useArrayFilter";
import useSort from "@/hooks/useArraySort";
import { AiOutlineDownload, AiOutlineEdit } from "react-icons/ai";
import { EditableRow } from "./EditableRow";
import { TiDelete } from "react-icons/ti";

export type ColumnConfig<U extends Record<string, any>> = {
  name: keyof U;
  friendlyName?: string;
  formatter?: (row: U, index: number) => ReactNode;
  isSortable?: boolean;
  isFilterable?: boolean;
};

interface TableProps<T extends Record<string, any>> {
  data: T[];
  columns: ColumnConfig<T>[];
  idField: keyof T;
  onRowSave: (rowData: T) => void;
  onRowDelete: (rowData: T) => void;
  isEditable?: boolean;
  isFilterable?: boolean;
}

const Table: React.FC<TableProps<any>> = <T extends Record<string, any>>({
  data,
  columns,
  idField,
  onRowSave,
  onRowDelete,
  isEditable,
  isFilterable  
}: TableProps<T>) => {
  const [tableData, setTableData] = useState<T[]>([]);
  const tableHeaderRef = useRef<HTMLTableRowElement>(null);
  const [editRow, setEditRow] = useState<string | null>();
  const [editFormData, setEditRowData] = useState<T>({} as T);

  //Rerender component when data is changed.
  useEffect(() => {
    setTableData([...data]);
  }, [data]);

  /*useFilter Custom Hook */
  const { filteredData, filters, handleInputChange, resetFilters } = useTableFilter<T>(tableData);

  /*useSort Custom Hook*/
    const {sortedData,sortedColumn,sortDirection,handleSort,getSortIndicator} = useSort<T>(filteredData);

  //Uses the 'file-saver' package to export table to csv.
  const handleExport = () => {
    const csvData = Papa.unparse(filteredData, {
      columns: columns.map((col) => col.name as string),
    });
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, `tableExport-${new Date().toISOString()}.csv`);
  };

  const handleEditClick = (record: T) => {
    setEditRow(record[idField]);
    setEditRowData(record);
  };

  const handleEditFormSubmit = async () => {
    try {
      onRowSave(editFormData);
      setEditRow(null);
      resetFilters();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const name = event.target.getAttribute("name") as keyof T;
    const value = event.target.value;
    const newFormData = { ...editFormData! };
    newFormData[name] = value as T[keyof T]; // Ensure type safety here
    setEditRowData(newFormData);
  };

  const handleDeleteClick = (record: T) => {
    setEditRowData(record);
    onRowDelete(record);
  };  

  return (
    <div>
      <div className=''>
        <div className="table-actions-group">
          <button onClick={resetFilters}>Clear Filters</button>
          <AiOutlineDownload onClick={handleExport} size={24} />
        </div>
        <div className="table-container">
        <table>
          <thead>
            {/* Generate Header Row */}
            <tr ref={tableHeaderRef}>
              {columns.map((headerConfig, idx) => {
                return (
                  <th key={idx} onClick={() => handleSort(headerConfig.name)}>
                    {String(headerConfig.friendlyName ?? headerConfig.name)}
                    {getSortIndicator(headerConfig.name)}
                  </th>
                );
              })}
              {isEditable && <th></th>}
            </tr>
            {/* Generate Filter Row */}
            {isFilterable && (
              <tr>
                {columns.map((headerConfig, idx) => (
                  <td key={String(headerConfig.name)}>
                    <input
                      type="search"
                      onChange={(e) =>
                        handleInputChange(headerConfig.name, e.target.value)
                      }
                      value={filters[headerConfig.name] || ""}
                    />
                  </td>
                ))}
              </tr>
            )}
          </thead>
          <tbody>
            {/* Generate Table Rows from Sorted and Filtered Data */}
            {sortedData!.map((record, rowIndex) => {
              return (
                <React.Fragment key={record[idField]}>
                  <tr key={record[idField]}>
                    {/* Generate Row Cells from each object use values or Formatter if avaialble*/}
                    {columns.map((col, idx) => {
                      return col.formatter ? (
                        <td key={idx}>{col.formatter(record, rowIndex)}</td>
                      ) : (
                        <td key={idx}>{String(record[col.name])}</td>
                      );
                    })}
                    {/* If isEditable show edit button */}
                    {isEditable && (
                      <td>
                        <AiOutlineEdit
                          size={24}
                          onClick={() => {
                            handleEditClick(record);
                          }}
                        ></AiOutlineEdit>
                      </td>
                    )}

                    {isEditable && (
                      <td>                        
                        <TiDelete
                          size={24}
                          onClick={() => {
                            handleDeleteClick(record);
                          }}
                        />
                      </td>
                    )}
                  </tr>
                  {editRow === record[idField] && (
                    <EditableRow<T>
                      item={editFormData!}
                      columnConfig={columns}
                      idField={idField}
                      handleEditClick={handleEditClick}
                      handleEditFormChange={handleEditFormChange}
                      handleEditFormSubmit={handleEditFormSubmit}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};

export default Table;


// Define default props
Table.defaultProps = {
  isEditable: false,
  isFilterable: false,
};