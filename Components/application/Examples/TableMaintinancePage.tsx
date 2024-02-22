import React, { useEffect, useState } from "react";
import { RiseLoader } from "react-spinners";
import Table, { ColumnConfig } from "@/components/general/Table/Table";
import { useAlert } from "@/contexts/Alert/AlertContext";
import { GenericWithInternalIdField } from "@/types/types";
import { addIdPropertyToArray, getFromApi, putToApi } from "@/class-libraries/utils/fetch-helper/fetch-helper";

interface PageProps<T extends Record<string, any>> {
  title: string;
  apiUrl: string;
  idKeys: (keyof T)[];
  tableColumns: ColumnConfig<T>[];
}

function Page<T extends Record<string, any>>({
  title,
  apiUrl,
  idKeys,
  tableColumns,
}: PageProps<T>) {
  const { success, danger } = useAlert();
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState<GenericWithInternalIdField<T>[]>([]);

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
      const endpoint = generateEndpoint(rowData);
      await putToApi<T>(apiUrl, rowData);
      const newData = await getFromApi<T[]>(endpoint);
      const newDataWithID = addIdPropertyToArray<T>(newData);
      setTableData(newDataWithID);
      success("Data Saved Successfully");
    } catch (err) {
      console.error(err);
      danger("Error Saving Data");
    }
  };

  const generateEndpoint = (rowData: T) => {
    return idKeys.reduce((acc, key) => {
      const value = rowData[key];
      return `${String(acc)}/${value}`;
    }, apiUrl) as string;
  };

  const onRowDelete = (rowData:T)=>{
    alert(`Delete:${JSON.stringify(rowData)}`);
  }
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
          onROwDelete={onRowDelete}
        />
      </section>
    </div>
  );
}

export default Page;
