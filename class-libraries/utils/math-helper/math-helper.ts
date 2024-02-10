

export function round(number:number, digits:number,) {
    let expandNumber = number * Math.pow(10, digits);
    let tuncatedNumber = Math.round(expandNumber);
    let roundedNumber = tuncatedNumber / Math.pow(10, digits);
    return roundedNumber
}