import Page from '@/components/application/Examples/TableMaintinancePage';
import { ColumnConfig } from '@/components/general/StandardTable/StandardTable'
import React  from 'react'



function UnitChargeProducts() {
    const apiUrlUnitChrageProducts = process.env.NEXT_PUBLIC_BACKEND_PRODUCTS!;
    const tableColumns:ColumnConfig<UnitChargeProducts>[] = [
        {name:'Unit'},
        {name:'Charge_ProductCode',friendlyName:"Charge Product"},
        {name:'Charge_ProductDesc',friendlyName:'Description'},
        {name:'MaxDailyRate'}
    ]
           
const keyFields: Array<keyof UnitChargeProducts> = ['Unit','Charge_ProductCode']

  return (
    <div>
        <Page
        title='Unit Charge Products Maintinance'
        apiUrl={apiUrlUnitChrageProducts}
        keyFields={keyFields}
        tableColumns={tableColumns}
        />
    </div>
  )
}

export default UnitChargeProducts;

