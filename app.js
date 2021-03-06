import colors from './colors.js';
import createPixels from './create-pixels.js';

const grid = document.querySelector('main');
const input = document.getElementById('color');
const colorChoice = document.querySelector('colors');
const button = document.querySelector('button');
const pixels = document.getElementsByClassName('pixel');
const sizeChange = document.querySelector('select');

let pixelStorage = [];
let chosenColor;

let lengthAndWidth = createPixels(grid, chosenColor);

function paintPixels(pixels) {
    for(let i = 0; i < pixels.length; i++) {
        let pixel = pixels[i];
        pixel.addEventListener('click', function() {
            pixel.style.backgroundColor = chosenColor;
        });
        pixel.addEventListener('dragover', function() {
            pixel.style.backgroundColor = chosenColor;
        });
    }
}
sizeChange.addEventListener('change', function() {
    paintPixels(pixels);
});
paintPixels(pixels);

sizeChange.addEventListener('change', function() {
    let numberOfPixels;
    let sizeOfPixels;

    for(let i = 0; i < pixels.length; i++) {
        grid.removeChild(pixels[i]);
        i--;
    }

    if(sizeChange.value === '1') {
        numberOfPixels = 400;
        sizeOfPixels = 30;
    } 
    if(sizeChange.value === '2') {
        numberOfPixels = 900;
        sizeOfPixels = 20;
    }
    if(sizeChange.value === '3') {
        numberOfPixels = 2500;
        sizeOfPixels = 12;
    }
    if(sizeChange.value === '4') {
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
    lengthAndWidth = Math.sqrt(pixels.length);
    rowsAndColumns();
    console.log(lengthAndWidth);
});

function rowsAndColumns() {
    pixelStorage = [];
    let x = 0;
    for(let i = 0; i < lengthAndWidth; i++) {
        let row = [];
        for(let j = 0; j < lengthAndWidth + x ; j++) {
            if(j >= x) {
                row.push(pixels[j]);
            }
        }
        pixelStorage.push(row);
        x += lengthAndWidth;
    }
    console.log(pixelStorage);
}
rowsAndColumns();

let codesAndColors = [];
let colorsFromObject = [];
let hexCodesFromObject = [];

function getColorNamesFromObject(storeColors, codes, both, obj) {
    for(let color in obj) {
        let name = color;
        storeColors.push(name);
    }  
    for(let color in obj) {
        let hex = obj[color];
        codes.push(hex);
    }
    both.push(storeColors);
    both.push(codes);
    return both;
}

let codesAndColorsArray = getColorNamesFromObject(colorsFromObject, hexCodesFromObject, codesAndColors, colors);
let colorsArray = codesAndColorsArray[0];
let hexArray = codesAndColorsArray[1];


for(let i = 0; i < colorsArray.length; i++) {
    colorChoice.classList.add('hidden');
    let colorBar = document.createElement('div');
    colorBar.classList.add('color-bar');

    colorBar.textContent = colorsArray[i];
    if(colorsArray[i] === 'Black' || colorsArray[i] === 'Indigo' || colorsArray[i] === 'Navy blue' || colorsArray[i] === 'Prussian blue') {
        colorBar.style.color = 'white';
    }
    colorBar.style.backgroundColor = '#' + hexArray[i];
    
    colorBar.addEventListener('click', function() {
        chosenColor = '#' + hexArray[i];
        input.style.backgroundColor = chosenColor;
        input.value = colorBar.textContent;

        colorChoice.classList.add('hidden');
        button.classList.remove('hidden');

        if(colorsArray[i] === 'Black' || colorsArray[i] === 'Indigo' || colorsArray[i] === 'Navy blue' || colorsArray[i] === 'Prussian blue') {
            input.style.color = 'white';
        } else {
            input.style.color = 'black';
        }
    });
    colorChoice.style.border = '2px solid black';
    colorChoice.appendChild(colorBar); 
}


input.addEventListener('click', function() {
    button.classList.add('hidden');
    colorChoice.classList.remove('hidden');
});

button.addEventListener('click', function() {
    for(let i = 0; i < pixels.length; i++) {
        pixels[i].style.backgroundColor = 'white';
    }
});

let right;
function animateRight() {
    let endPieces = [];
    for(let a = 0; a < lengthAndWidth; a++) {
        for(let b = lengthAndWidth - 1; b > -1; b--) {
            if(b === lengthAndWidth - 1) {
                let lastPiece = pixelStorage[a][b].style.backgroundColor;
                endPieces.push(lastPiece);
            }
            if(b > 0) {
                pixelStorage[a][b].style.backgroundColor = pixelStorage[a][b - 1].style.backgroundColor;
            }
            if(b === 0) {
                pixelStorage[a][0].style.backgroundColor = endPieces[a];
            }
        } 
    }
    right = requestAnimationFrame(animateRight);
}

let left;
function animateLeft() {
    let endPieces = [];
    for(let a = 0; a < lengthAndWidth; a++) {
        for(let b = 0; b < lengthAndWidth; b++) {
            if(b === 0) {
                let lastPiece = pixelStorage[a][b].style.backgroundColor;
                endPieces.push(lastPiece);
            }
            if(b < lengthAndWidth - 1) {
                pixelStorage[a][b].style.backgroundColor = pixelStorage[a][b + 1].style.backgroundColor;
            }
            if(b === lengthAndWidth - 1) {
                pixelStorage[a][b].style.backgroundColor = endPieces[a];
            }
        }
    }
    left = requestAnimationFrame(animateLeft);
}


const animateDivs = document.getElementsByClassName('quarter-circle');

function resetAnimationButtons(currentDiv) {
    for(let i = 0; i < animateDivs.length; i++) {
        if(i !== currentDiv) {
            animateDivs[i].style.backgroundColor = 'blue';
        }
    }
} 

function cancelAnimations() {
    cancelAnimationFrame(right);
    cancelAnimationFrame(left);
}

animateDivs[0].addEventListener('click', function() {
    this.style.backgroundColor = 'green';
    resetAnimationButtons(0);
    cancelAnimations();
});
animateDivs[1].addEventListener('click', function() {
    cancelAnimations();
    requestAnimationFrame(animateLeft);
    this.style.backgroundColor = 'green';
    resetAnimationButtons(1);
});
animateDivs[2].addEventListener('click', function() {
    cancelAnimations();
    requestAnimationFrame(animateRight);
    this.style.backgroundColor = 'green';
    resetAnimationButtons(2);
});
animateDivs[3].addEventListener('click', function() {
    cancelAnimations();
    this.style.backgroundColor = 'green';
    resetAnimationButtons(3);
});

colorChoice.parentElement.addEventListener('click', function(e) {
    if(e.target !== input) {
        colorChoice.style.display = 'none';
    } else {
        colorChoice.style.display = 'initial';
    }
});

const puase = document.getElementById('pause');
puase.addEventListener('click', function() {
    cancelAnimationFrame(right);
    cancelAnimationFrame(left);
    for(let i = 0; i < animateDivs.length; i++) {
        animateDivs[i].style.backgroundColor = 'blue';
    }
});
