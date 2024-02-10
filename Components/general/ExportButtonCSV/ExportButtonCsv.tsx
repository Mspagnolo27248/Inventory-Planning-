

type TotalType = 'count' | 'sum' | 'none';

type ExportButtonCSVType<T> = {
  data:T[],
  columns:ColumnExportSettings<T>[]
  children: React.ReactNode; // Added children prop
  fileName?:string;

}
export interface ColumnExportSettings<T> {
    dataName: keyof T;
    friendlyName?: string;
    formatter?: (value: T[keyof T]) => string;
    shouldTotal?: TotalType
  }



  function exportDataToCSV<T>(
    data: T[],
    columns:ColumnExportSettings<T>[]
  ) {

    const csvRows: string[] = [];
    
     // Generate the header row
  const headerRow = columns.map(column => column.friendlyName ? column.friendlyName :column.dataName.toString());
  csvRows.push(headerRow.join(','));

  // Generate the data rows
  for (const dataObject of data) {
    const dataRow = columns.map(column => {
      const value = dataObject[column.dataName];
      const formattedValue = column.formatter ? column.formatter(value) : value;
      return formattedValue;
    });
    csvRows.push(dataRow.join(','));
  }

  const userWantsTotals = columns.some((column) => column.shouldTotal !== undefined);

  if(userWantsTotals){

      // Generate the total row if specified
  const totalRow = columns.map(column => {
    if (column.shouldTotal === 'count') {
      return data.length.toString();
    } else if (column.shouldTotal === 'sum') {
      const total = data.reduce((acc, dataObject) => {
        const value = dataObject[column.dataName];
        return acc + (typeof value === 'number' ? value : 0);
      }, 0);
      return total.toString();
    }
    return '';
  });

    csvRows.push(totalRow.join(','));

  }

  
 

  // Join all rows with line breaks
  const csvContent = csvRows.join('\n');

  return csvContent;
}



const ExportCSVButton: React.FC<ExportButtonCSVType<any>>= ({data,columns,children,fileName='data'}) => {
    const handleExport = () => {
      const csvContent = exportDataToCSV(data, columns);
      const csvData = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const csvURL = URL.createObjectURL(csvData);
      const tempLink = document.createElement('a');
      tempLink.href = csvURL;
      tempLink.setAttribute('download', `${fileName}.csv`);
      tempLink.click();
      URL.revokeObjectURL(csvURL);
    };
  
    return (
      <button onClick={handleExport}>{children}</button>
    );
  };
  
  export default ExportCSVButton;