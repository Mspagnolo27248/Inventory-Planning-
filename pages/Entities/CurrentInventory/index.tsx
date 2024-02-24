import Page from '@/components/application/Examples/TableMaintinancePage'
import { ColumnConfig } from '@/components/general/Table/Table'
import React from 'react'

function CurrentInventory() {
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_CURRENT_INVENTORY!
    const tableColumns:ColumnConfig<CurrentInventory>[] = [
        {name:'ProductCode'},
        {name:'Qty' , friendlyName:'Gallons',formatter:(row, index)=>(row.Qty?.toLocaleString())}
    ]

    const keyField:Array<keyof CurrentInventory> = ['id']
  return (
    <div>
        <Page
        title='Current Inventory'
        apiUrl={apiUrl}
        keyFields={keyField}
        tableColumns={tableColumns}        
        />
    </div>
  )
}

export default CurrentInventory