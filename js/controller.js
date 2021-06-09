'use strict'

var gSelectImage;
var gElCanvas;
var gCtx

function init() {
    console.log('hello')
    renderImages();
    reSetCanvas();

}

function reSetCanvas() {
    gElCanvas = document.querySelector('.my-canvas')
    gCtx = gElCanvas.getContext('2d')
}


function renderImages() {
    var images = getImages();
    console.log(images)
    var elImagesGallery = document.querySelector('.images-container');

    var strHTMLs = images.map((img) => {
        return `
        <div class="gallery-img">
        <img data-id="${img.id}" onclick="onselectionImage(this)" src="${img.url}" alt="">
        </div>
        `;
    });

    elImagesGallery.innerHTML = strHTMLs.join('');
}

function onselectionImage(el) {
    gSelectImage = el;
    drawImg2(el.src)
    moveToEditor()


}



function moveToEditor() {
    document.querySelector('main').classList.add('hidden');
    document.querySelector('.editor-container').classList.remove('hidden');
}

function moveToGallery() {
    document.querySelector('.main-content').classList.remove('hidden');
    document.querySelector('.editor-container').classList.add('hidden');
}





function drawImg2() {
    var img = new Image()
    img.src = 'img/1.jpg';
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    }
}




function drawText(text, x, y) {
    gCtx.lineWidth = 2
        // gCtx.strokeStyle = 'red'
        // gCtx.fillStyle = 'white'
    gCtx.font = '40px Arial'
        // gCtx.textAlign = 'center'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}


function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
        // You may clear part of the canvas
        // gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height/4)
}

function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL()
    console.log('DATA', data);
    elLink.href = data
    elLink.download = 'puki'
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    // Note: changing the canvas dimension this way clears the canvas
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}


function draw(ev) {
    // return
    const offsetX = ev.offsetX
    const offsetY = ev.offsetY
        // console.log(offsetX,offsetY)
        // const { offsetX, offsetY } = ev
    switch (gCurrShape) {
        case 'triangle':
            drawTriangle(offsetX, offsetY)
            break;
        case 'rect':
            drawRect(offsetX, offsetY)
            break;
        case 'text':
            drawText('Puki', offsetX, offsetY)
            break;
        case 'line':
            drawLine(offsetX, offsetY)
            break;
    }
}