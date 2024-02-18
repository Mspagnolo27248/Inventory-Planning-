import React, { Key } from "react";
import { ColumnConfig } from "./Table";

export const EditableRow = <T extends Record<string, any>>(props: {
  item: T;
  columnConfig: ColumnConfig<T>[];
  idField: keyof T;
  handleEditClick: (event: any) => void;
  handleEditFormChange: (event: any) => void;
  handleEditFormSubmit: (event: any) => void;
}) => {
  const { item, columnConfig, idField } = props;
  return (
    <tr>
      {columnConfig.map((col) => {
        return (
          // Create an input for each Propertiy in ColumnConfig
          <td key={String(col.name)}>
            <input
              type="text"
              required={true}
              placeholder="...."
              value={item[col.name].toString()}
              name={String(col.name)}
              key={String(col.name)}
              onChange={props.handleEditFormChange}
            ></input>
          </td>
        );
      })}
      <td>
        <button type="button" onClick={props.handleEditClick}>
          Cancel
        </button>
        <button
          type="submit"
          onClick={(event) => props.handleEditFormSubmit(event)}
        >
          Save
        </button>
      </td>
    </tr>
  );
};
