const isInteger = (number: any): boolean => {
    return isNaN(number) ? false : ((number | 0) == number);
}
const isNotInteger = (number: any): boolean => {
    return !isInteger(number);
}

export { isInteger, isNotInteger }