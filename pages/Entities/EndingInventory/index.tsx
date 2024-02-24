import Page from '@/components/application/Examples/TableMaintinancePage'
import { ColumnConfig } from '@/components/general/Table/Table'
import React from 'react'

function EndingInventory() {
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_ENDING_INVENTORY!
    const keyFiels:Array<keyof EndingInventory> = ['Date','ProductCode']
    const tableColumns:ColumnConfig<EndingInventory>[] = [
        {name:'Date'},
        {name:'ProductCode'},
        {name:'ProductDesc'},
        {name:'BeginInventory'},
        {name:'ProductionIn'},
        {name:'Receipts'},
        {name:'ProductionOut'},
        {name:'BlendedOut'},
        {name:'Demand'},
        {name:'EndingInventory'}

    ]
    
  return (
    <div>
        <Page
        title='Ending Inventory'
        apiUrl={apiUrl}
        tableColumns={tableColumns}
        keyFields={keyFiels}
        />
    </div>
  )
}

export default EndingInventory