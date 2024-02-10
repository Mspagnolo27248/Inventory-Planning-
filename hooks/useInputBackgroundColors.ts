import { useState } from "react";

/**
 * Type for specifying background color options.
 */
export type backgroundColorTypes = 'red' | 'yellow' | 'green';

/**
 * Type for mapping item IDs to background colors.
 */
export type InputBackgroundColorType = {
    [key: number]: string;
};

/**
 * Custom hook for managing input background colors.
 * @returns An object containing inputBackgroundColors and update function.
 */
const useInputBackgroundColors = () => {
    /**
     * State to store the mapping of item IDs to background colors.
     */
    const [inputBackgroundColors, setInputBackgroundColors] = useState<InputBackgroundColorType>({});

    /**
     * Update the background color for a specific item.
     * @param {number} itemId - The ID of the item.
     * @param {backgroundColorTypes} color - The background color to set.
     */
    function update(itemId: number, color: backgroundColorTypes) {
        setInputBackgroundColors((prevColors) => ({
            ...prevColors,
            [itemId]: color,
        }));
    }

    return { inputBackgroundColors, update };
};

export default useInputBackgroundColors;
