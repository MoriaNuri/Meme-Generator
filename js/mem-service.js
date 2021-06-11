'use strict'

var gCtx
var gMeme
var gElCanvas
var gCurrLine


var gKeywords = { 'happy': 12, 'funny puk': 1 }
var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['happy'] },
    { id: 2, url: 'img/2.jpg', keywords: ['happy'] },
    { id: 3, url: 'img/3.jpg', keywords: ['happy'] },
    { id: 4, url: 'img/4.jpg', keywords: ['happy'] },
    { id: 5, url: 'img/5.jpg', keywords: ['happy'] },
    { id: 6, url: 'img/6.jpg', keywords: ['happy'] },
    { id: 7, url: 'img/7.jpg', keywords: ['happy'] },
    { id: 8, url: 'img/8.jpg', keywords: ['happy'] },
    { id: 9, url: 'img/9.jpg', keywords: ['happy'] },
    { id: 10, url: 'img/10.jpg', keywords: ['happy'] },
    { id: 11, url: 'img/11.jpg', keywords: ['happy'] },
    { id: 12, url: 'img/12.jpg', keywords: ['happy'] },
    { id: 13, url: 'img/13.jpg', keywords: ['happy'] },
    { id: 14, url: 'img/14.jpg', keywords: ['happy'] },
    { id: 15, url: 'img/15.jpg', keywords: ['happy'] },
    { id: 16, url: 'img/16.jpg', keywords: ['happy'] },
    { id: 17, url: 'img/17.jpg', keywords: ['happy'] },
    { id: 18, url: 'img/18.jpg', keywords: ['happy'] },
];

var gStickers = [
    { id: 1, url: 'img/stiker1.jpg' },
    { id: 2, url: 'img/stiker2.jpg' },
    { id: 3, url: 'img/stiker3.jpg' },
    { id: 4, url: 'img/stiker4.jpg' },
];



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
        }]
    }
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

function updateCurrLine() {
    gCurrLine = gMeme.lines[gMeme.selectedLineIdx]
}

function setPrevLineIdx() {
    var idx = gMeme.lines.length - 1
    gMeme.selectedLineIdx = (idx >= 0) ? idx : 0
}

function setImage(imgId) {
    gMeme.selectedImgId = imgId
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
    if (gMeme.selectedLineIdx > 0)
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



// function downloadImg(elLink) {

//     const data = gElCanvas.toDataURL('image/png')
//     elLink.href = data
//     elLink.download = 'my-meme.png'
// }
function downloadImg(elLink) {

    var imgContent = gElCanvas.toDataURL('')
    elLink.href = imgContent
}