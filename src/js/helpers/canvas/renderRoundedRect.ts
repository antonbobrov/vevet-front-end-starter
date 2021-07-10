export default function renderRoundedRect (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    borderRadius: number,
) {

    const w = width;
    const h = height;

    ctx.moveTo(
        x + w - borderRadius,
        y + h,
    );
    ctx.arcTo(
        x, y + h,
        x, y,
        borderRadius,
    );
    ctx.arcTo(
        x, y,
        x + w, y,
        borderRadius,
    );
    ctx.arcTo(
        x + w, y,
        x + w, y + h,
        borderRadius,
    );
    ctx.arcTo(
        x + w, y + h,
        x, y + h,
        borderRadius,
    );

}
