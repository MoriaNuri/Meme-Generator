'use strict'


var gKeywords = { 'happy': 12, 'funny puk': 1 }
var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['happy'] },
    { id: 1, url: 'img/2.jpg', keywords: ['happy'] },
    { id: 1, url: 'img/3.jpg', keywords: ['happy'] },
    { id: 1, url: 'img/4.jpg', keywords: ['happy'] },
    { id: 1, url: 'img/5.jpg', keywords: ['happy'] },
    { id: 1, url: 'img/6.jpg', keywords: ['happy'] },
    { id: 1, url: 'img/7.jpg', keywords: ['happy'] },
    { id: 1, url: 'img/8.jpg', keywords: ['happy'] },
    { id: 1, url: 'img/9.jpg', keywords: ['happy'] },
    { id: 1, url: 'img/10.jpg', keywords: ['happy'] },
    { id: 1, url: 'img/11.jpg', keywords: ['happy'] },
    { id: 1, url: 'img/12.jpg', keywords: ['happy'] },
    { id: 1, url: 'img/13.jpg', keywords: ['happy'] },
    { id: 1, url: 'img/14.jpg', keywords: ['happy'] },
    { id: 1, url: 'img/15.jpg', keywords: ['happy'] },
    { id: 1, url: 'img/16.jpg', keywords: ['happy'] },
    { id: 1, url: 'img/17.jpg', keywords: ['happy'] },
    { id: 1, url: 'img/18.jpg', keywords: ['happy'] }
];


var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        { txt: 'I never eat Falafel', size: 20, align: 'left', color: 'red' },
    ],
};

function getImages() {
    return gImgs;
}