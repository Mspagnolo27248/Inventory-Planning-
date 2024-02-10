

/**
 * Checks if the provided text is a valid number by using a regular expression pattern.
 * The pattern allows for an optional minus sign, followed by one or more digits, and an optional decimal point with zero or more digits.
 * If the text matches the pattern, the function returns true; otherwise, it returns false.
 *
 * @param {string} text - The text to be checked.
 * @returns {boolean} - True if the text is a valid number, false otherwise.
 */


export const textIsNumber = (text:string) => {
    const pattern = /^-?\d+(\.\d*)?$/;
    return pattern.test(text);
  }


  export function getColorBasedOnConditions(hasChanged:boolean, isValid:boolean, changedColor:string='yellow', invalidColor:string='red', defaultColor:string='') {
    if (hasChanged) {
      if (isValid) {
        return changedColor; // Changed and valid
      } else {
        return invalidColor; // Changed but not valid
      }
    } else {
      return defaultColor; // Not changed
    }
  }
  

  