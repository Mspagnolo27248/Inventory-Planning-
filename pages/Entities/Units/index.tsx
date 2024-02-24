import Page from '@/components/application/Examples/TableMaintinancePage';
import { ColumnConfig } from '@/components/general/Table/Table';
import React from 'react'

function Units() {
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_UNIT!;
  const keyFields:Array<keyof Units>= ['UnitCode'];
  const tableColumns: ColumnConfig<Units>[]= [
    {name:'UnitCode'},

  ]

  return (
    <div>
                 <Page
        title='Units'
        apiUrl={apiUrl}
        tableColumns={tableColumns}
        keyFields={keyFields}
        />
    </div>
  )
}

export default Units