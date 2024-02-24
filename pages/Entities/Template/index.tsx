import Page from "@/components/application/Examples/TableMaintinancePage";
import { ColumnConfig } from "@/components/general/Table/Table";


export default function Template() {
    const title = "Finished Blend Requirement";
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_BLEND_REQUIREMENTS!;
    const tableColumns:ColumnConfig<BlendRequirements>[]=[
      { name: 'Finished_ProductCode' },
      { name: 'Finished_ProductDesc' },
      { name: 'Component_ProductCode' },
      { name: 'Component_ProductDesc' },
      { name: 'BlendPercent',formatter(row, index){
        return`${row.BlendPercent.toFixed(2)}%`},
      },
    ];
  
    const idKeys:Array<keyof BlendRequirements> = ["Finished_ProductCode", "Component_ProductCode"];
  
    return (
      <Page
        title={title}
        apiUrl={apiUrl}
        tableColumns={tableColumns}
        keyFields={idKeys}
      />
    );
  }
  