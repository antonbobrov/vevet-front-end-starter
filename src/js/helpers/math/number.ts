export function strToNum (
    val: string,
) {
    if (typeof val !== 'string') {
        val = `${val}`;
    }
    val = val.replace(',', '.');
    val = val.replace(/[^\d,.]/g, '');
    return parseFloat(val);
}
