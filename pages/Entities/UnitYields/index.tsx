import { round } from "@/class-libraries/utils/math-helper/math-helper";
import { ColumnConfig } from "@/components/general/Table/Table";
import Page from "@/components/application/Examples/TableMaintinancePage";



function UnitYields() {
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_UNIT_YIELDS!;

  
  
  const tableColumns: ColumnConfig<UnitYields>[] = [
    { name: "Unit" },
    { name: "Charge_ProductCode", friendlyName: "Charge Product" },
    { name: "Charge_ProductDesc", friendlyName: "Charge Desc" },
    { name: "Finished_ProductCode", friendlyName: "Finished Code" },
    { name: "Finished_ProductDesc", friendlyName: "Finished Description" },
    { name: "OutputPercent",
      formatter(row, index) {
        return `${round(row.OutputPercent * 100, 2).toFixed(2)}%`;
      },
    },
  ];

 const keyFields:Array<keyof UnitYields> = ['Unit','Charge_ProductCode','Finished_ProductCode']

  return (
    <div>
  <Page
  title="Unit Yields Maintinance"
  apiUrl={apiUrl}
  tableColumns={tableColumns}
  keyFields={keyFields}
  />
    </div>
  );
}

export default UnitYields;
