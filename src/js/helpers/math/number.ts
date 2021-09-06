export default function strToNum (
    arg: string | number,
) {
    let val = arg;
    if (typeof val !== 'string') {
        val = `${val}`;
    }
    val = val.replace(',', '.');
    val = val.replace(/[^\d,.]/g, '');
    return parseFloat(val);
}
