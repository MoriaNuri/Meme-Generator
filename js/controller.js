'use strict'

function init() {
    renderImages();
    // renderStickers();
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

function renderStickers() {
    var elStickersGsllery = document.querySelector('.stikers-gallery');
    var strHtml = gStickers.map((sticker) => {
        return `
        <img src="${sticker.url}" alt "" onSelectSticker(${sticker.id})">
        `;
    });
    elStickersGsllery.innerHTML = strHtml.join('')

}


function onSelectImage(imgId) {
    resetMeme()
    setImage(imgId)
    moveToEditor()
    reSetCanvas()
    renderCanvas()
    renderLines()
    renderStickers()

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
    cleanActive()
}

function moveToGallery() {
    document.querySelector('.main-content').classList.remove('hidden');
    document.querySelector('.editor').classList.add('hidden');
    addActive()
}

function cleanActive() {
    var el = document.querySelector('.gallery')
    el.classList.remove('active')
}

function addActive() {
    var el = document.querySelector('.gallery')
    el.classList.add('active')
}


function drawImage() {
    var img = new Image()
    img.src = getImageUrl();
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        renderLines()

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

function onMove(number) {
    moveLine(number)
    drawImage()
    renderLine(gMeme.lines[gMeme.selectedLineIdx])
}

function onChangeLine() {
    var text = changeLine() || '';
    document.querySelector('[name="meme-text"]').value = text;
    // changeLine()
    // updateCurrLine()
    // renderLine()
}

function onAddLine() {
    addLine()
    drawImage()
    updateCurrLine()
    renderLine(gCurrLine)
    setPrevLineIdx()
    clearInput()
}

function onDelete() {
    deleteLine()
    drawImage()
    renderLine()
}

function onUpdateSize(addition) {
    updateSize(addition)
    drawImage()
    renderLine(gMeme.lines[gMeme.selectedLineIdx])

}

function onAlign(direction) {
    alignText(direction)
    drawImage()
    renderLine(gMeme.lines[gMeme.selectedLineIdx])
}

function onUpdatFont(newFont) {
    updatFont(newFont)
    drawImage()
    renderLine(gMeme.lines[gMeme.selectedLineIdx])
}

function onSetStrokeColor(newStrokeColor) {
    setStrokeColor(newStrokeColor)
    drawImage()
    renderLine(gMeme.lines[gMeme.selectedLineIdx])

}

function onSetFillColor(newFillColor) {
    SetFillColor(newFillColor)
    drawImage()
    renderLine(gMeme.lines[gMeme.selectedLineIdx])
}


function onDownloadImg(elLink) {
    downloadImg(elLink)

}



function drawTriangle(x, y) {
    gCtx.beginPath()
    gCtx.lineWidth = 2
    gCtx.moveTo(x, y)
    gCtx.lineTo(20, 100)
    gCtx.lineTo(50, 220)
    gCtx.closePath()
        // gCtx.lineTo(x, y)
    gCtx.fillStyle = gCurrColor
    gCtx.fill()
    gCtx.strokeStyle = gCurrColor
    gCtx.stroke()
}

function clearInput() {
    document.querySelector('input[name="meme-text"]').value = ''
}