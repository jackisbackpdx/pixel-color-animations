export default function createPixels(grid) {
    let pixelCount = 0;
    for(let i = 0; i < 3600; i++) {
        let pixel = document.createElement('div');
        pixel.classList.add('pixel');
    
        pixel.style.backgroundColor = 'white';
        
        grid.appendChild(pixel);

        pixelCount++;
    }
    let lengthAndWidth = Math.sqrt(pixelCount);
    return lengthAndWidth;
}