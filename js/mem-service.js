'use strict'

var gCtx
var gMeme
var gElCanvas
var gCurrLine

// var gFilterBy
var gInputFilter


var gKeywords = { 'happy': 12, 'funny puk': 1 }
var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['pilitic'] },
    { id: 2, url: 'img/2.jpg', keywords: ['pest'] },
    { id: 3, url: 'img/3.jpg', keywords: ['pets', 'kids'] },
    { id: 4, url: 'img/4.jpg', keywords: ['pets'] },
    { id: 5, url: 'img/5.jpg', keywords: ['kids'] },
    { id: 6, url: 'img/6.jpg', keywords: ['happy'] },
    { id: 7, url: 'img/7.jpg', keywords: ['kids'] },
    { id: 8, url: 'img/8.jpg', keywords: ['happy'] },
    { id: 9, url: 'img/9.jpg', keywords: ['kids'] },
    { id: 10, url: 'img/10.jpg', keywords: ['[olitic]'] },
    { id: 11, url: 'img/11.jpg', keywords: ['happy'] },
    { id: 12, url: 'img/12.jpg', keywords: ['happy'] },
    { id: 13, url: 'img/13.jpg', keywords: ['happy'] },
    { id: 14, url: 'img/14.jpg', keywords: ['happy'] },
    { id: 15, url: 'img/15.jpg', keywords: ['happy'] },
    { id: 16, url: 'img/16.jpg', keywords: ['happy'] },
    { id: 17, url: 'img/17.jpg', keywords: ['politic'] },
    { id: 18, url: 'img/18.jpg', keywords: ['kids'] },
];

var gStickers = [
    { id: 1, url: 'img/stiker1.png' },
    { id: 2, url: 'img/stiker2.png' },
    { id: 3, url: 'img/stiker3.png' },
    { id: 4, url: 'img/stiker4.png' },
];

function getStickerUrl(id) {
    return gStickers.find(sticker => sticker.id === id)
}

function getMmemStickerUrl(id) {
    return gMeme.stickers.find(sticker => sticker.id === id).url
}

function getImageUrl() {
    return gImgs.find(img => img.id === gMeme.selectedImgId).url
}




function resetMeme() {
    gMeme = {
        selectedImgId: null,
        selectedLineIdx: 0,
        lines: [{
            txt: 'Enter your txt',
            x: 240,
            y: 100,
            fontSize: 30,
            lineWidth: 2,
            fontFamily: 'Impact',
            textAlign: 'center',
            fillStyle: 'white',
            strokeStyle: 'black'
        }],
        selectedStickersIdx: -1,
        stickers: []
    }
}


function setImage(imgId) {
    gMeme.selectedImgId = imgId
}

function addLine() {
    gMeme.lines.push({
        txt: 'Enter your txt',
        x: 240,
        y: 400,
        fontSize: 30,
        lineWidth: 2,
        fontFamily: 'Impact',
        textAlign: 'center',
        fillStyle: 'white',
        strokeStyle: 'black'
    })
}

function addsticker(id) {
    gMeme.stickers.push({
        id: gMeme.stickers.length,
        url: getStickerUrl(id),
        x: 100,
        y: 200,

    })
}

function updateCurrLine() {
    gCurrLine = gMeme.lines[gMeme.selectedLineIdx]
}

function setPrevLineIdx() {
    var idx = gMeme.lines.length - 1
    gMeme.selectedLineIdx = (idx >= 0) ? idx : 0
}



function setMemeLine(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function moveLine(number) {
    var newPosition = gMeme.lines[gMeme.selectedLineIdx].y + number
    gMeme.lines[gMeme.selectedLineIdx].y = newPosition

}

function changeLine() {
    if (!gMeme.lines[0]) return
    gMeme.selectedLineIdx++
        if (gMeme.selectedLineIdx > gMeme.lines.length - 1) gMeme.selectedLineIdx = 0;
    highlightLine();
    drawImage();
    return gMeme.lines[gMeme.selectedLineIdx].txt;

}

function highlightLine() {
    if (gMeme.lines.length > 0) {
        var selectedLine = gMeme.lines[gMeme.selectedLineIdx]
        var height = selectedLine.size;
        var width = gCtx.measureText(selectedLine.txt).width;
        var x = gMeme.lines[gMeme.selectedLineIdx].x;
        var y = gMeme.lines[gMeme.selectedLineIdx].y;

        gCtx.save();
        gCtx.lineWidth = 2;
        gCtx.strokeStyle = 'gray';
        gCtx.beginPath()
        gCtx.strokeRect(x - 10, y, width + 15, height + 10)
        gCtx.restore();
    }
}


function deleteLine() {
    if (gMeme.selectedLineIdx >= 0)
        gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx -= 1
}


function alignText(direction) {
    gMeme.lines[gMeme.selectedLineIdx].textAlign = direction
}

function updateSize(addition) {
    var newSize = gMeme.lines[gMeme.selectedLineIdx].fontSize + addition
    gMeme.lines[gMeme.selectedLineIdx].fontSize = newSize

}

function updatFont(newFont) {
    gMeme.lines[gMeme.selectedLineIdx].fontFamily = newFont
}

function setStrokeColor(newStrokeColor) {
    gMeme.lines[gMeme.selectedLineIdx].strokeStyle = newStrokeColor
}

function SetFillColor(newFillColor) {
    gMeme.lines[gMeme.selectedLineIdx].fillStyle = newFillColor
}


function downloadImg(elLink) {

    var imgContent = gElCanvas.toDataURL('')
    elLink.href = imgContent
}

var gCurrLang = 'en'

function setLang(lang) {
    gCurrLang = lang;
}

function generateKeyWords() {
    let copyOfImgs = JSON.parse(JSON.stringify(gImgs));

    let keysMap = copyOfImgs.reduce((acc, img) => {
        img.keywords.forEach((keyword) => {
            acc[keyword] = acc[keyword] ? acc[keyword] + 1 : 1;
        });
        return acc;
    }, {});

    return keysMap;
}

function selectLineToMove(ev) {
    var lineIndex = gMeme.lines.findIndex(line => {
        let txtWidth = gCtx.measureText(line.txt);
        ev.offsetY > line.y - line.fontSize &&
            ev.offsetY < line.y + line.fontSize &&
            ev.offsetX > line.x
    })
    gIslineDragged = lineIndx
}

// function SetFilter(filterBy) {
//     gFilterBy = filterby
// }


function updateFilter(inputFilter) {
    gInputFilter = inputFilter
}

function getImgs() {
    var regex = new RegExp(gInputFilter, 'i')
    return gImgs.filter(img => regex.test(img.keywords[0]))
}