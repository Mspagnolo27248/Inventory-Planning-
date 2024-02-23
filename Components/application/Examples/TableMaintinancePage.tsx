import React, { useEffect, useState } from "react";
import { RiseLoader } from "react-spinners";
import Table, { ColumnConfig } from "@/components/general/Table/Table";
import { useAlert } from "@/contexts/Alert/AlertContext";
import { GenericWithInternalIdField } from "@/types/types";
import { addIdPropertyToArray, deleteToApi, generateObjectKeysWithStringValues, getFromApi, putToApi } from "@/class-libraries/utils/fetch-helper/fetch-helper";
import { IoAddCircle } from "react-icons/io5";

interface PageProps<T extends Record<string, any>> {
  title: string;
  apiUrl: string;
  keyFields: (keyof T)[];
  tableColumns: ColumnConfig<T>[];
}

function Page<T extends Record<string, any>>({
  title,
  apiUrl,
  keyFields,
  tableColumns,
}: PageProps<T>) {
  
  const { success, danger } = useAlert();
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState<GenericWithInternalIdField<T>[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const initalFormData = (tableData[0]?generateObjectKeysWithStringValues(Object.keys(tableData[0])):{}) as T;

  useEffect(() => {//Pageload Event
    fetchData();
  }, [apiUrl]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await getFromApi<T[]>(apiUrl);
      const dataWithID = addIdPropertyToArray<T>(data);
      setTableData(dataWithID);
    } catch (err) {
      console.error(err);
      danger("Error Connecting to WEB API");
    }
    setIsLoading(false);
  };

  const handleRowSave = async (rowData: T) => {
    try {
      const endpoint = generateEndpoint(rowData,keyFields);
      await putToApi<T>(endpoint,rowData);
      const newData = await getFromApi<T[]>(apiUrl);
      const newDataWithID = addIdPropertyToArray<T>(newData);
      setTableData(newDataWithID);
      success("Data Saved Successfully");
    } catch (err) {
      console.error(err);
      danger("Error Saving Data");
    }
  };

  const handleRowDelete = async (rowData:T)=>{
    try {
      const endpoint = generateEndpoint(rowData,keyFields);
      await deleteToApi<T>(endpoint,rowData);
      const newData = await getFromApi<T[]>(apiUrl);
      const newDataWithID = addIdPropertyToArray<T>(newData);
      setTableData(newDataWithID);
      success("Data Saved Successfully");
    } catch (err) {
      console.error(err);
      danger("Error Saving Data");
    }

  }

  const handleRowAdd = async (rowData:T)=>{
    throw new Error(JSON.stringify(rowData))

  }
  //Generic Move to Class Library
  const generateEndpoint = (rowData: T,idKeyFields:Array<keyof T>) => {
    return idKeyFields.reduce((acc, key) => {
      const value = rowData[key];
      return `${String(acc)}/${value}`;
    }, apiUrl) as string;
  };

  return (
    <div>
      <div>
        <h1>{title}</h1>
      </div>
      <section>
        <RiseLoader loading={isLoading} />
        <Table
          data={tableData}
          columns={tableColumns}
          idField={"internalId"}
          onRowSave={handleRowSave}
          onRowDelete={handleRowDelete}          
          isFilterable 
          isEditable   
        />
      </section>
    </div>
  );
}

export default Page;
