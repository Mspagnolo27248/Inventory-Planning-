import { useState, ChangeEvent } from 'react';


export interface InputState {
    value: string;
    hasChanged: boolean;
    isValid: boolean;
}

export interface InputStates {
    [key: string]: InputState;
}

type ValidatorFunction = (value: string) => boolean;

type onFailValidation = (value:string,name:string)=>void;

/**
 * Custom React hook for managing the state of multiple input fields with validation.
 *
 * @param {InputStates} [initialInputStates] - An optional object representing the initial state of input fields.
 * @param {ValidatorFunction} [validator] - An optional function used to validate input values.
 * @param {onFailValidation} [onFailValidation] - An optional callback function called when validation fails.
 *
 * @returns {{
*   inputStates: InputStates,               // Current state of all input fields.
*   handleInputsChange: Function,           // Function to handle input value changes.
*   updateInputStates: Function,            // Function to update input field states.
* }}
*
* @typedef {Object} InputState
* @property {string} value - The current value of the input field.
* @property {boolean} hasChanged - Indicates if the input value has changed.
* @property {boolean} isValid - Indicates if the input value is valid according to the validator function.
*
* @typedef {Object.<string, InputState>} InputStates - A collection of input field states, where the keys are input field names.
*
* @typedef {function(string): boolean} ValidatorFunction - A function that takes an input value and returns a boolean indicating its validity.
*
* @typedef {function(string, string): void} onFailValidation - A callback function called when input validation fails.
*/

const useInputState = (
    initialInputStates?: InputStates,
    validator?:ValidatorFunction,
    onFailValidation?:onFailValidation
    ) => {
    const [inputStates, setInputStates] = useState<InputStates>(initialInputStates||{} as InputStates); 

    const handleInputsChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        let isValid = true;   
        if (validator) {
            isValid = validator(value);
            if (onFailValidation && !isValid) {
                onFailValidation(value,name);
              } 
          }
        setInputStates(prevInputStates => { return {
                    ...prevInputStates,
                    [name]: {
                            value:value, 
                            hasChanged: true,
                            isValid:isValid
                        }
                    }});
                  };


    const updateInputStates = (newState: InputStates) => {
        setInputStates((prevInputStates) => {
          return {
            ...prevInputStates,
            ...newState,
          };
        });
      };
    

    return { inputStates, handleInputsChange ,updateInputStates};
};

export default useInputState;
