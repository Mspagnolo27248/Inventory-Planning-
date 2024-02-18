import { getFromApi, getFromApiAndSetState } from '@/class-libraries/utils/fetch-helper/fetch-helper';
import { round } from '@/class-libraries/utils/math-helper/math-helper';
import Table, { ColumnConfig } from '@/components/general/Table/Table';
import React, { useEffect, useState } from 'react'



function UnitYields() {
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_UNIT_YIELDS !;
    const [tableData,setTableData]= useState<UnitYields[]>([]);
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
           
    useEffect(()=>{  /*Page Load Event */
    // async function load() {
    //     const data =  await   getFromApi<UnitYields[]>(apiUrl);
    //     setTableData(data);
    // }
    // load();
    getFromApiAndSetState(setTableData,apiUrl)
 
    },[])
  return (
    <div>
        <section>
            Unit Yields 
        </section>

        <section>
            {tableData &&  <Table data={tableData} columns={tableColumns}/>}
        </section>
    </div>
  )
}

export default UnitYields;




