import {
  convertFullStringDateToShortDate,
  customDateFormat,
} from "@/class-libraries/utils/date-helper/date-helper";
import { groupByProperty } from "@/class-libraries/utils/dto-helper/dto-helper";
import { fetchDataAndAddId } from "@/class-libraries/utils/fetch-helper/fetch-helper";
import { useAlert } from "@/contexts/Alert/AlertContext";
import React, { useEffect, useState } from "react";

function SchedulePage() {
  const [scheduleData, setScheduleData] =
    useState<(Schedule & { internalId: string })[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [sortedDates, setSortedDates] = useState<Date[]>();
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_SCHEDULE || "";
  const { danger } = useAlert();
  const [data, setData] = useState<Object>();

  useEffect(() => {
    //Pageload Event
    fetchDataAndAddId(apiUrl, setScheduleData, setIsLoading).catch(() =>
      danger("Error Connecting to WEB API")
    );
  }, [apiUrl]);

  useEffect(() => {
    // Initialize an object to store quantities for each unit-product combination
    const unitProductQuantities: {
      [key: string]: {
        Unit: string;
        Charge_ProductCode: string;
        Qty: number[];
      };
    } = {};
    // Iterate over the data array and accumulate quantities
    if (!scheduleData) return;
    // Sort the dates
    const sortedDates = Array.from(
      new Set(scheduleData.map((item) => item.Date))
    ).sort();
    setSortedDates(sortedDates);

    // Create an object where keys are date strings and values are index positions
    const dateIndexMap: { [key: string]: number } = {};
    sortedDates.forEach((date, index) => {
      dateIndexMap[String(date)] = index;
    });

    scheduleData!.forEach(
      ({ Unit, Charge_ProductCode, Charge_ProductDesc, Date, Qty }) => {
        const key = `${Unit}-${Charge_ProductCode}`;
        if (!unitProductQuantities[key]) {
          unitProductQuantities[key] = {
            Unit,
            Charge_ProductCode: `${Charge_ProductCode}-${Charge_ProductDesc}`,
            Qty: Array(sortedDates.length).fill(0), // Initialize array based on sorted dates length
          };
        }
        // Set Qty at the index position based on the date
        const index = dateIndexMap[String(Date)];
        unitProductQuantities[key].Qty[index] += Qty;
      }
    );

    setData(unitProductQuantities);
  }, [scheduleData]);

  return (
    <div>
      <div className="header-section">
      <h1>Production Schedule</h1>

      </div>
     
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Unit</th>
              <th>Charge Product</th>
              {sortedDates?.map((dateName, idx) => (
                <th key={idx}>{`${customDateFormat(
                  dateName,
                  formtatDate
                )}`}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data &&
              Object.entries(data!).map(([key, record], idx) => (
                <tr key={idx}>
                  <td>{record.Unit}</td>
                  <td>{record.Charge_ProductCode}</td>
                  {record.Qty.map((day: number, idx: number) => (
                    <td key={idx}>{(day/42).toLocaleString()}</td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SchedulePage;

type CrossTabType = {
  [Unit: string]: { [Charge_ProductCode: string]: Array<number> };
};

const formtatDate = (month: number, date: number, year: number) => {
  return `${month}/${date}`;
};
