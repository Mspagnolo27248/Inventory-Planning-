type TotalType = 'count' | 'sum' | 'none';


export interface ColumnExportSettings<T> {
    dataName: keyof T;
    friendlyName?: string;
    formatter?: (value: T[keyof T]) => string;
    shouldTotal?: TotalType
  }

export function ExportCSV<T>(data:T[],columns:ColumnExportSettings<T>[],fileName:string='export'):void{
const csvRows: string[] = [];  
  const headerRow = columns.map(column =>    // Generate the header row
    column.friendlyName ? 
    column.friendlyName :
    column.dataName.toString());
  csvRows.push(headerRow.join(',')); 
  for (const dataObject of data) {  // Generate the data rows
    const dataRow = columns.map(column => {
      const value = dataObject[column.dataName];
      const formattedValue = column.formatter ? 
      column.formatter(value) : 
      value;
      return formattedValue;
    });
    csvRows.push(dataRow.join(','));
  }
  const userWantsTotals = columns.some((column) => 
  column.shouldTotal !== undefined
  );
  if(userWantsTotals){     
  const totalRow = columns.map(column => { // Generate the total row if specified
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
const csvContent = csvRows.join('\n'); // Join all rows with line breaks
csvContent;
const csvData = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
const csvURL = URL.createObjectURL(csvData);
const tempLink = document.createElement('a');
tempLink.href = csvURL;
tempLink.setAttribute('download', `${fileName}"-"${(new Date()).toLocaleString('en-US')}.csv`);
tempLink.click();
URL.revokeObjectURL(csvURL);
    }



// Function to create a CSV string
export function CreateCSVString<T>(data: T[], columns: ColumnExportSettings<T>[]): string {
  const csvRows: string[] = [];
  const headerRow = columns.map((column) =>
    column.friendlyName ? column.friendlyName : column.dataName.toString()
  );
  csvRows.push(headerRow.join(','));
  for (const dataObject of data) {
    const dataRow = columns.map((column) => {
      const value = dataObject[column.dataName];
      const formattedValue = column.formatter ? column.formatter(value) : value;
      return formattedValue;
    });
    csvRows.push(dataRow.join(','));
  }
  const userWantsTotals = columns.some((column) => column.shouldTotal !== undefined);
  if (userWantsTotals) {
    const totalRow = columns.map((column) => {
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
  return csvRows.join('\n');
}

/**
 * Export a CSV string as a downloadable file.
 *
 * @param {string} csvString - The CSV string content to export.
 * @param {string} [fileName='export'] - The name of the CSV file to be downloaded.
 */
export function ExportStringToCSV(csvString:string, fileName:string='export') {
  const csvData = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const csvURL = URL.createObjectURL(csvData);
  const tempLink = document.createElement('a');
  tempLink.href = csvURL;
  tempLink.setAttribute('download', `${fileName}-${new Date().toLocaleString('en-US')}.csv`);
  tempLink.click();
  URL.revokeObjectURL(csvURL);
}