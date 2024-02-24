import Page from "@/components/application/Examples/TableMaintinancePage"
import { ColumnConfig } from "@/components/general/Table/Table";


function MonthlyDemandForecast() {
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_MONTHLY_DEMAND!;
  const keyFields:Array<keyof MonthlyDemandForecast>= [];
  const tableColumns: ColumnConfig<MonthlyDemandForecast>[]= [
    {name:'YYYYMM'},
    {name:'Finished_ProductCode'},
    {name:'Finished_ProductDesc'},
    {name:'Qty'}
  ]

  return (
    <div>
           <Page
        title='Monthly Demand Forecast'
        apiUrl={apiUrl}
        tableColumns={tableColumns}
        keyFields={keyFields}
        />
    </div>
  )
}

export default MonthlyDemandForecast