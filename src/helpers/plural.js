export const plural = (count) => {
    if (String(count).match(/(?<!1)[2,3,4]$/g)) {
        return 'раза'
    }
    return 'раз'
}