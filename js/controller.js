'use strict'




function init() {
    renderImages();
}



function renderImages() {
    var elImagesGallery = document.querySelector('.images-container');
    var strHTML = gImgs.map((img) => {
        return `
        <img src="${img.url}" alt "" onclick="onselectImage(${img.id})">
        `;
    });
    elImagesGallery.innerHTML = strHTML.join('')

}




function onselectImage(imgId) {
    resetMeme()
    setImage(imgId) // in service mem
        // drawImg2(el.src)
    moveToEditor()
    reSetCanvas()
    renderCanvas()
    drawText()
}

function reSetCanvas() {
    gElCanvas = document.querySelector('#my-canvas')
    gCtx = gElCanvas.getContext('2d')
}

function renderCanvas() {
    drawImage()

}


function moveToEditor() {
    document.querySelector('main').classList.add('hidden');
    document.querySelector('.editor-container').classList.remove('hidden');
}

function moveToGallery() {
    document.querySelector('.main-content').classList.remove('hidden');
    document.querySelector('.editor-container').classList.add('hidden');
}


// function drawImg() {
//     var elImg = document.querySelector('img')
//     gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)
//         // console.log(gCanvas.width);
// }



function drawImage() {
    var img = new Image()
    img.src = getImageUrl();
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}

// function drawImg3() {
//     var img = new Image()
//     img.src = 'https://steamuserimages-a.akamaihd.net/ugc/940586530515504757/CDDE77CB810474E1C07B945E40AE4713141AFD76/';
//     img.onload = () => {
//         gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
//     }
// }




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