import { addIdPropertyToArray, getFromApi, getFromApiAndSetState, putToApi } from '@/class-libraries/utils/fetch-helper/fetch-helper';
import Table, { ColumnConfig } from '@/components/general/Table/Table'
import { useAlert } from '@/contexts/Alert/AlertContext';
import { GenericWithInternalIdField } from '@/types/types';
import React, { useEffect, useState } from 'react'
import { RiseLoader } from 'react-spinners';


function BlendRequirement() {
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_BLEND_REQUIREMENTS!;
    const {success,danger} = useAlert();
    const [isLoading,setIsLoading] = useState(true);
    const [tableData,setTableData] = useState<GenericWithInternalIdField<BlendRequirements>[]>([]);

    const tableColumns:ColumnConfig<BlendRequirements>[] = [
        {name:'Finished_ProductCode'},
        {name:'Finished_ProductDesc'},
        {name:'Component_ProductCode'},
        {name:'Component_ProductDesc'},
        {name:'BlendPercent',formatter(row, index) {
            return `${row.BlendPercent.toFixed(2)}%`
        },}
    ]

    useEffect(()=>{   
      setIsLoading(true)     
      try{
        getAndSetTableData(apiUrl,setTableData)
        .catch(err=>{
          danger('Error Connecting to WEB API')
        })
      }catch(err){
        console.error(err)
        danger('Error Connecting to WEB API')
      }
      setIsLoading(false)   
    },[apiUrl,danger]);

    const handleRowSave = async (rowData: BlendRequirements) => {
        try{
          await putToApi<BlendRequirements>(
            apiUrl +
              `/${rowData.Finished_ProductCode}/${rowData.Component_ProductCode}`,
            rowData
          );
          getAndSetTableData(apiUrl,setTableData);
          success("Data Saved Successfully")
        }catch (err){
          danger("Error Saving Data")
        } 
      };

  return (
    <div>
    <div><h1>Finished Blend Requirement</h1></div>
    <section>
      <RiseLoader color={'red'} loading={isLoading}/>
          <Table
            data={tableData}
            columns={tableColumns}
            idField={"internalId"}
            onRowSave={handleRowSave}
          />      
      </section>
    </div>
  )
}

export default BlendRequirement

  async function getAndSetTableData<T>(apiUrl: string, setState: React.Dispatch<React.SetStateAction<T[]>>) {
    try {
      const data = await getFromApi<T[]>(apiUrl);
      const dataWithID = addIdPropertyToArray<T>(data);
      setState(dataWithID);
    } catch (err) {
      throw err; 
    }
  }