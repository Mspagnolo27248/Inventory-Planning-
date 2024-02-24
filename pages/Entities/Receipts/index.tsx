import Page from '@/components/application/Examples/TableMaintinancePage'
import { ColumnConfig } from '@/components/general/Table/Table';
import React from 'react'

function Receipts() {
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_RECEIPTS!;
    const keyFields:Array<keyof Receipt>= ['Date','ProductCode'];
    const tableColumns: ColumnConfig<Receipt>[]= [
      {name:'Date'},
      {name:'ProductCode'},
      {name:'ProductDesc'},
      {name:'Qty'}
 
    ]
  
  return (
    <div>
              <Page
        title='Receipts'
        apiUrl={apiUrl}
        tableColumns={tableColumns}
        keyFields={keyFields}
        />
    </div>
  )
}

export default Receipts