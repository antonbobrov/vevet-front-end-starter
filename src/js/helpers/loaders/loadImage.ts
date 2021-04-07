// images
export const images: Image[] = [];

interface Image {
    src: string;
    img: HTMLImageElement;
}



export function loadedImage (
    src: string,
) {
    for (let i = 0; i < images.length; i++) {
        const img = images[i];
        if (img.src === src) {
            return img.img;
        }
    }
    return false;
}



export function loadImage (
    src: string,
    success: (img: HTMLImageElement) => void,
    error?: () => void,
) {

    // if the image was loaded before
    const isLoaded = loadedImage(src);
    if (isLoaded) {
        success(isLoaded);
        return;
    }

    // if the image was never loaded before
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
        images.push({
            src,
            img,
        });
        success(img);
    };
    img.onerror = () => {
        if (error) {
            error();
        }
    };
    img.src = src;

}
