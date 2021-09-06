export default function loadScript (url: string) {
    return new Promise((resolve) => {
        const head = document.getElementsByTagName('head')[0];
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.addEventListener('load', () => {
            resolve(script);
        });
        script.src = url;
        head.appendChild(script);
    });
}
