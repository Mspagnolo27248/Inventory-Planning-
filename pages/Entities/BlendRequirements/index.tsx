import Page from "@/components/application/Examples/TableMaintinancePage";
import { ColumnConfig } from "@/components/general/Table/Table";
import { GenericWithInternalIdField } from "@/types/types";
import React, { useEffect, useState } from "react";

function BlendRequirement() {
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_BLEND_REQUIREMENTS!;

  const tableColumns: ColumnConfig<BlendRequirements>[] = [
    { name: "Finished_ProductCode" },
    { name: "Finished_ProductDesc" },
    { name: "Component_ProductCode" },
    { name: "Component_ProductDesc" },
    {
      name: "BlendPercent",
      formatter(row, index) {
        return `${row.BlendPercent.toFixed(2)}%`;
      },
    },
  ];

  const keyFields: Array<keyof BlendRequirements> = [
    "Finished_ProductCode",
    "Component_ProductCode",
  ];

  return (
    <Page
      title='Blend Requirements'
      apiUrl={apiUrl}
      keyFields={keyFields}
      tableColumns={tableColumns}
    />
  );
}

export default BlendRequirement;
