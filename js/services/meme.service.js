'use strict'

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

let gElCanvas
let gElCanvasContainer
let gCtx
let gStartPos
var gCurrImg
gElCanvas = document.querySelector('canvas')
gElCanvasContainer = document.querySelector('.canvas-container')
gCtx = gElCanvas.getContext('2d')

var gImgs = [
    { id: 0, url: '/meme-imgs-square/1.jpg', keywords: ['funny', 'cat'] },
    { id: 1, url: '/meme-imgs-square/2.jpg', keywords: ['funny', 'cat'] },
]
var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        {
            pos: { x: gElCanvas.width / 2, y: gElCanvas.height / 4 },
            txt: 'I sometimes eat Falafel',
            size: 20,
            color: 'red',
            isDrag: false,
        },
        {
            pos: { x: gElCanvas.width / 2, y: (gElCanvas.height / 4) * 3 },
            txt: 'Shwarma!',
            size: 40,
            color: 'blue',
            isDrag: false,
        },
    ],
}
var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }

function _getLine() {
    return gLines
}

// function isLineClicked(clickedPos) {
//     const { pos } = gLine
//     const distance = Math.sqrt(
//         (pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2
//     )
//     return distance <= gLine.size
// }

// function setLineDrag(isDrag) {
//     gLine.isDrag = isDrag
// }

function moveLine(pos, dx, dy) {
    console.log('🚀 ~ file: meme.service.js:55 ~ moveLine ~ pos:', pos)
    var selectedLine = gMeme.lines[gMeme.selectedLineIdx].pos
    selectedLine.x += dx
    selectedLine.y += dy
}

function drawLine(x, y, size, color, text) {
    gCtx.beginPath()
    gCtx.fillStyle = color
    gCtx.font = size + 'px inconsolata'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.fillText(text, x, y)
}
