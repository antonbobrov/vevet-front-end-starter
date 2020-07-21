export default function rand () {
    Math.seed = (Math.seed * 108013 + 2531011) & 0xffffffff;
    return Math.abs(Math.seed >> 16) / 32869;
}
