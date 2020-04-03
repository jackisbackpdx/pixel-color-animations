export default function changeSize(sizeValue, grid, pixels, chosenColor) {
    sizeValue.addEventListener('change', function() {
        let numberOfPixels;
        let sizeOfPixels;
    
        for(let i = 0; i < pixels.length; i++) {
            grid.removeChild(pixels[i]);
            i--;
        }
    
        if(sizeValue.value === '1') {
            numberOfPixels = 400;
            sizeOfPixels = 28;
        } 
        if(sizeValue.value === '2') {
            numberOfPixels = 900;
            sizeOfPixels = 18;
        }
        if(sizeValue.value === '3') {
            numberOfPixels = 2150;
            sizeOfPixels = 13;
        }
        if(sizeValue.value === '4') {
            numberOfPixels = 3600;
            sizeOfPixels = 10;
        }
    
        for(let i = 0; i < numberOfPixels; i++) {
            let pixel = document.createElement('div');
            pixel.classList = 'pixel';
            pixel.style.height = sizeOfPixels + 'px';
            pixel.style.width = sizeOfPixels + 'px';
        
            pixel.addEventListener('click', function() {
                pixel.style.backgroundColor = chosenColor;
            });
            pixel.addEventListener('dragover', function() {
                pixel.style.backgroundColor = chosenColor;
            });
        
            grid.appendChild(pixel);
        
        }
        let lengthAndWidth = Math.sqrt(pixels.length);
        return lengthAndWidth;
    });
    
}
