import Page from '@/components/application/Examples/TableMaintinancePage'
import { ColumnConfig } from '@/components/general/Table/Table';
import React from 'react'

function Schedule() {
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_SCHEDULE!;
    const keyFields:Array<keyof Schedule>= ['Date','Unit','Charge_ProductCode'];
    const tableColumns: ColumnConfig<Schedule>[]= [
      {name:'Unit'},
      {name:'Date'},
      {name:'Charge_ProductCode'},
      {name:'Charge_ProductDesc'},
      {name:'Qty'}
    ]
  

  return (
    <div>
             <Page
        title='Schedule'
        apiUrl={apiUrl}
        tableColumns={tableColumns}
        keyFields={keyFields}
        />
    </div>
  )
}

export default Schedule