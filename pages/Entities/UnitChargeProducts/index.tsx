import { getFromApi } from '@/class-libraries/utils/fetch-helper/fetch-helper';
import StandardTable, { ColumnConfig } from '@/components/general/StandardTable/StandardTable'
import React, { useEffect, useState } from 'react'



function UnitChargeProducts() {
    const apiUrlUnitChrageProducts = process.env.NEXT_PUBLIC_BACKEND_PRODUCTS!;
    const [tableData,setTableData]= useState<UnitChargeProducts[]>();
    const tableColumns:ColumnConfig<UnitChargeProducts>[] = [
        {name:'Unit'},
        {name:'Charge_ProductCode',friendlyName:"Charge Product"},
        {name:'Charge_ProductDesc',friendlyName:'Description'},
        {name:'MaxDailyRate'}
    ]
           
    useEffect(()=>{  /*Page Load Event */
    const pageload = async()=>{
        const data = await getFromApi<UnitChargeProducts[]>(apiUrlUnitChrageProducts);
        setTableData(data);
    }
    },[])
  return (
    <div>
        <section>
            Unit Charge Products
        </section>

        <section>
            {tableData &&  <StandardTable data={tableData} columns={tableColumns}/>}
        </section>
    </div>
  )
}

export default UnitChargeProducts;

