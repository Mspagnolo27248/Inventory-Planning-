import { useEffect, useState } from "react";
import { addIdPropertyToArray,getFromApi, putToApi,} from "@/class-libraries/utils/fetch-helper/fetch-helper";
import { round } from "@/class-libraries/utils/math-helper/math-helper";
import Table, { ColumnConfig } from "@/components/general/Table/Table";
import { useAlert } from "@/contexts/Alert/AlertContext";
import { GenericWithInternalIdField } from "@/types/types";



function UnitYields() {
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_UNIT_YIELDS!;
  const { danger,success} = useAlert();
  const [tableData, setTableData] = useState<
    GenericWithInternalIdField<UnitYields>[]
  >([]);

  //Get the entity data from API and set to state
  //TODO-make pure
  async function getAndSetTableData() {
    const data = await getFromApi<UnitYields[]>(apiUrl);
    const dataWithID = addIdPropertyToArray<UnitYields>(data);
    setTableData(dataWithID);
    //TODO- add data fromatter function to the getFromApiAndSetState func. 
    // getFromApiAndSetState(setTableData,apiUrl)
  }

  //Table Config.
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

  /*Page Load Event */
  useEffect(() => {
    getAndSetTableData();
  }, []);

  const handleRowSave = async (rowData: UnitYields) => {
    try{
      await putToApi<UnitYields>(
        apiUrl +
          `/${rowData.Unit}/${rowData.Charge_ProductCode}/${rowData.Finished_ProductCode}`,
        rowData
      );
      getAndSetTableData();
      success("Data Saved Successfully")
    }catch (err){
      danger("Error Saving Data")
    } 
  };

  return (
    <div>
      <section> Unit Yields</section>
      <section>
        {tableData && (
          <Table
            data={tableData}
            columns={tableColumns}
            idField={"internalId"}
            onRowSave={handleRowSave}
          />
        )}
      </section>
    </div>
  );
}

export default UnitYields;
