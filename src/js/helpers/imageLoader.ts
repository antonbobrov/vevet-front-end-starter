// images
const images: Image[] = [];

interface Image {
    src: string;
    img: HTMLImageElement;
}
    


function load(
    src: string, 
    callback: (img: HTMLImageElement) => void
) {

    // if the image was loaded before
    for (let i = 0; i < images.length; i++) {
        const img = images[i];
        if (img.src === src) {
            callback(img.img);
            return;
        }
    }
    
    // if the image was never loaded before
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
        images.push({
            src: src,
            img: img
        });
        callback(img);
    }
    img.src = src;

}



export {
    images,
    load
};