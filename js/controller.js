'use strict'

var gImg

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
    renderStickers()
    resizeCanvas()
}


function moveToEditor() {
    document.querySelector('main').classList.add('hidden');
    document.querySelector('.editor').classList.remove('hidden');
    cleanActive()
}

function reSetCanvas() {
    gElCanvas = document.querySelector('#my-canvas')
    gCtx = gElCanvas.getContext('2d')
}


function renderCanvas() {
    drawImage()
}

function renderLines() {
    if (gMeme.lines.length) {
        gMeme.lines.forEach(line => {
            renderLine(line)
        });
    }
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

function drawImage() {
    var img = new Image()
    img.src = getImageUrl();
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        renderLines()

    }
}

function renderStickers() {
    var elStickersGallery = document.querySelector('.stickers .s');
    var strHtml = gStickers.map((sticker) => {
        return `
        <img src="${sticker.url}" alt "" onSelectSticker(${sticker.id})">
        `;
    });
    elStickersGallery.innerHTML = strHtml.join('')
}


// function onSelectSticker(id) {
//     addsticker(id)
//     drawSticker(gMeme.stickers.length - 1)
//         // var url = getStickerUrl(stickerId)
//         // var newSticker = { id: stickerId, url: url, x: 100, y: 100 }
//         // gMeme.sticker.push(newSticker)
// }

// function drawSticker() {
//     var sticker = getStickerUrl(id)
//     var img = new Image()
//     img.src = sticker.url
//     img.onload = () => {
//         gCtx.drawImage(img, sticker.x, sticker.y, gElCanvas.width, gElCanvas.height)
//     }
// }


function moveToGallery() {
    document.querySelector('.main-content').classList.remove('hidden');
    document.querySelector('.editor').classList.add('hidden');
    addActive()
    clearInput()
}

function cleanActive() {
    var el = document.querySelector('.gallery')
    el.classList.remove('active')
}

function addActive() {
    var el = document.querySelector('.gallery')
    el.classList.add('active')
}


function onInputText(txt) {
    setMemeLine(txt)
    renderLine(gMeme.lines[gMeme.selectedLineIdx])
    drawImage()
}



function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)

}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
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
    renderLines()
    setPrevLineIdx()
    updateCurrLine()
    drawImage()
    clearInput()

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

function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

function renderImg(img) {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
}


function onSaveMeme() {
    var currentSave = loadFormStorage();
    if (!currentSave) currentSave = [];

    currentSave.push(gMeme);

    saveToLocal(currentSave);

    setInputTxt('');
    renderSavedProj();
    gotoMainPage();
}

function onSetLang(lang) {
    setLang(lang);
    if (lang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')
        // renderBooks();
    doTrans();
}

function onInputFilter(inputFilter) {
    updateFilter(inputFilter)
    renderImages()
}

// function onSetFilter(filterBy) {
//     updateFilterBy(filterBy)
//     renderImgs()
// }



// function filterImages(imgs, txt) {
//     var imgsForDisplay = imgs.filter((img) => {
//         return img.keywords.some((keyword) => {
//             return keyword.toUpperCase().includes(txt.toUpperCase());
//         });
//     });

//     return imgsForDisplay;
// }


function toggleMenu() {
    document.querySelector('body').classList.toggle('open-menu');
}



// *******************MOVE LINE*******************

function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchstart', onDown)
    gCanvas.addEventListener('touchend', onUp)
}




function onDown(ev) {
    const pos = getEvPos(ev)
    if (!islineClicked(pos)) return
    setLineDrag(true)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'

}

function onMove(ev) {
    const line = getLine();
    if (circle.isDrag) {
        const pos = getEvPos(ev)
            // console.log('gStartPos:', gStartPos)
            // console.log('pos:', pos)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        moveLine(dx, dy)
        gStartPos = pos
        renderCanvas()
    }
}


function onUp() {
    setLineDrag(false)
    document.body.style.cursor = 'grab'
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}

function setLineDrag(isDrag) {
    gCurrLine.isDrag = isDrag
}


function moveLine(dx, dy) {

    // console.log('gCircle.pos.x:', gCircle.pos.x)
    // console.log('gCircle.pos.y:', gCircle.pos.y)
    // console.log('dy:', dy)
    // console.log('dx:', dx)
    gCurrLine.x += dx
    gCurrLine.y += dy
        // console.log('gCircle.pos.x:', gCircle.pos.x)
        // console.log('gCircle.pos.y:', gCircle.pos.y)

}

function getLine() {
    return gCurrLine
}