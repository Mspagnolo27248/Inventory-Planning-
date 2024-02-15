import { useState, useMemo } from 'react';


/**
 * Custom React hook for sorting data in a table or list.
 *
 * @template T - The type of each data item in the array.
 * @param {Array<T>} initialData - The initial data array to be sorted.
 * @param {keyof T | undefined} [initialColumn] - The initial column to be sorted by. (optional)
 * @param {'asc' | 'desc' | undefined} [initialDirection='asc'] - The initial sorting direction. (optional)
 * @returns {{
*   sortedData: T[]; // The sorted data array.
*   sortedColumn: keyof T | undefined; // The currently sorted column.
*   sortDirection: 'asc' | 'desc' | undefined; // The current sorting direction.
*   handleSort: (columnKey: keyof T) => void; // Function to handle column header click for sorting.
*   getSortIndicator: (columnKey: keyof T) => string; // Function to get a sorting indicator for a column.
* * }} Object containing sorting information and functions for sorting.
*         - sortedData:T[]; The sorted data array.
*         - sortedColumn: keyof; T The currently sorted column.
*         - sortDirection:'asc'|'desc'; The current sorting direction.
*         - handleSort:(columnKey: keyof T) => string; Function to handle column header click for sorting.
*         - getSortIndicator:(columnKey: keyof T) => string; Function to get a sorting indicator to show in a column header.
*
* @example
* const {
*   sortedData,
*   sortedColumn,
*   sortDirection,
*   handleSort,
*   getSortIndicator,
* } = useSort(dataArray, 'columnName', 'asc');
*/



// Custom hook for sorting data
function useSort<T extends Record<string,any>>(
  initialData: T[]|undefined,
  initialColumn?: keyof T | null,
  initialDirection?: 'asc' | 'desc'
) {
  const [sortedColumn, setSortedColumn] = useState<keyof T | null>(initialColumn||null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'|null>(initialDirection||null);

  // Function to handle column header click
  const handleSort = (columnKey: keyof T) => {
    if (sortedColumn === columnKey) {
      setSortDirection((prevDirection) => (prevDirection === 'asc' ? 'desc' : 'asc'));
    } else {
      // If a new column is clicked, set it as the sorted column with ascending order
      setSortedColumn(columnKey);
      setSortDirection('asc');
      
    }
  };

 
  const sortData = () => {
    if(!initialData) return initialData;
    if (!sortedColumn) return initialData;
    const sorted = [...initialData].sort((valueA,valueB) => {
      const a = valueA[sortedColumn];
      const b = valueB[sortedColumn];

      if (sortDirection === 'asc') {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      } else {
        if (a > b) return -1;
        if (a < b) return 1;
        return 0;
      }
    });

    return sorted;
  };

  //const sortedData = sortData();
  const sortedData = useMemo(() => sortData(), [sortedColumn, sortDirection, initialData]);
  
  // Function to generate the sorting indicator based on column key and sortConfig
  const getSortIndicator = (columnKey: keyof T) => {
    if (columnKey === sortedColumn) {
      switch(sortDirection ) {
        case 'asc':
        return ' ▲';    
      case 'desc':        
        return ' ▼';
      default:
        return ' ↕' 
      }
    }
    return ' ↕'; 
  };

  return {
    sortedData,
    sortedColumn,
    sortDirection,
    handleSort,
    getSortIndicator
  };
}

export default useSort;
