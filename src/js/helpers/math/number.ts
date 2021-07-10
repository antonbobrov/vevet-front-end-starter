export function strToNum (
    val: string | number,
) {
    if (typeof val !== 'string') {
        val = `${val}`;
    }
    val = val.replace(',', '.');
    val = val.replace(/[^\d,.]/g, '');
    return parseFloat(val);
}
