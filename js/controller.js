'use strict'

function init() {
    renderImages();
}

function renderImages() {

    var elImagesGallery = document.querySelector('.images-container');
    var strHTML = gImgs.map((img) => {
        return `
        <img src="${img.url}" alt "" onclick="onSelectImage(${img.id})">
        `;
    });
    elImagesGallery.innerHTML = strHTML.join('')

}


function onSelectImage(imgId) {
    resetMeme()
    setImage(imgId)
    moveToEditor()
    reSetCanvas()
    renderCanvas()
    renderLines()

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
    document.querySelector('.editor').classList.remove('hidden');
}

function moveToGallery() {
    document.querySelector('.main-content').classList.remove('hidden');
    document.querySelector('.editor').classList.add('hidden');
}


function drawImage() {
    var img = new Image()
    img.src = getImageUrl();
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        renderLines()
            // drawText()
    }
}


function onInputText(txt) {
    setMemeLine(txt)
    renderLine(gMeme.lines[gMeme.selectedLineIdx])
    drawImage()


}

function renderLine(line) {
    gCtx.lineWidth = line.lineWidth
    gCtx.strokeStyle = line.strokeStyle
    gCtx.fillStyle = line.fillStyle
    gCtx.font = `${line.fontSize}px ${line.fontFamily}`
    gCtx.textAlign = line.textAlign
    console.log(line)
    gCtx.fillText(line.txt, line.x, line.y)
    gCtx.strokeText(line.txt, line.x, line.y)
}

function renderLines() {
    if (gMeme.lines.length) {
        gMeme.lines.forEach(line => {
            renderLine(line)
        });
    }
}

// gMeme.lines[gMeme.selectedLineIdx]

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
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}



// function onMove() {
//     moveLine()
// }

// function onChangeLine() {
//     changeLine()
// }

// function onAddText() {
//     addTxt()
// }

// function onDelete() {
//     deleteLine()
// }

function onUpdateSize(addition) {
    UpdateSize(addition)
}




function onAlign(direction) {
    alignText(direction)
    renderLine()
    drawImage()
}

// function onUpdatFont() {
//     updatFont()
// }

// function onSetStrokeColor() {
//     SetStrokeColor()
// }

// function onSetFillColor() {
//     SetFillColor()
// }