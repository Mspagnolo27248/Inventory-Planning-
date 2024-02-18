import { getFromApi, getFromApiAndSetState, postToApi, putToApi } from '@/class-libraries/utils/fetch-helper/fetch-helper';
import { round } from '@/class-libraries/utils/math-helper/math-helper';
import Table, { ColumnConfig } from '@/components/general/Table/Table';
import React, { useEffect, useState } from 'react'



type GenericWithInternalIdField<T extends Record<string, any>> =  T & { internalId: string }; // Use string if you need string IDs



function UnitYields() {
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_UNIT_YIELDS !;
    const [tableData,setTableData]= useState<GenericWithInternalIdField<UnitYields>[]>([]);
    const tableColumns:ColumnConfig<UnitYields>[] = [
        {name:'Unit'},
   {name:'Charge_ProductCode',friendlyName:'Charge Product'},
   {name:'Charge_ProductDesc',friendlyName:'Charge Desc'},
   {name:'Finished_ProductCode',friendlyName:'Finished Code'},
   {name:'Finished_ProductDesc',friendlyName:'Finished Description'},
   {name:'OutputPercent',formatter(row, index) {
       return `${round(row.OutputPercent*100,2).toFixed(2)}%`
   },}
    
    ]
         
    async function load() {
        const data =  await   getFromApi<UnitYields[]>(apiUrl);
        const dataWithId = data.map((record,idx)=>({...record,internalId:String(idx)}))
        setTableData(dataWithId);
    }

    useEffect(()=>{  /*Page Load Event */
    load();
   // getFromApiAndSetState(setTableData,apiUrl) 
    },[])


    const handleRowSave = async (rowData:UnitYields) => {
       await putToApi<UnitYields>(apiUrl+`/${rowData.Unit}/${rowData.Charge_ProductCode}/${rowData.Finished_ProductCode}`,rowData)
        load();
      };

    
  return (
    <div>
        <section>
            Unit Yields 
        </section>

        <section>
            {tableData &&  <Table data={tableData} columns={tableColumns} idField={'internalId'} onRowSave={handleRowSave}/>}
        </section>
    </div>
  )
}

export default UnitYields;




