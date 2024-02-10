


export  function generateIdProperties<T extends Object>(initalData:T[]){
    return  initalData.map((row,idx)=> ({...row,id:String(idx)}));
}




export function sumOfProperty<T>(array: T[], field: keyof T): number {
    return array.reduce((sum, object) => {
      const value = object[field];
      if (typeof value !== "number") {
        throw new Error(`Property "${String(field)}" is not a number`);
      }
      return sum + value;
    }, 0);
  }
  


  export function filterArrayByPropery<T>(array: T[], filterField: keyof T, filterValue: string | number): T[] {
    return array.filter(item => {
      const fieldValue = item[filterField];
  
      if (typeof fieldValue === 'string' || typeof fieldValue === 'number') {
        return fieldValue === filterValue;
      }
  
      return false;
    });
  }
  

  export function getObjectValuesByKeys<U extends Record<string, any>>(object: U, keysToInclude?: Array<keyof U>) {
    if(keysToInclude) return keysToInclude.map(key => object[key]);
    return  Object.values(object)
  }
  

      export const sumProperties = <T,>(arr: T[], prop: keyof T): number => {
        if (typeof arr[0][prop] === 'number') {
            return arr.reduce((sum, current) => sum + (current[prop] as number), 0);
        }

        if (typeof arr[0][prop] === 'string') {
            return arr.reduce((sum, current) => sum + (parseFloat(current[prop] as string)), 0);
        }
        return 0;

    };