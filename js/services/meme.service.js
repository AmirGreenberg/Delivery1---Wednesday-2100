'use strict'

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

let gElCanvas
let gElCanvasContainer
let gCtx
let gStartPos
var gCurrImg
var gSelectedLine

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
            txt: 'Falafel Falafel Falafel!',
            size: 20,
            color: 'red',
            isDrag: false,
        },
        {
            pos: { x: gElCanvas.width / 2, y: (gElCanvas.height / 4) * 3 },
            txt: 'Shwarma !',
            size: 40,
            color: 'blue',
            isDrag: false,
        },
    ],
}
var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }

function moveLine(pos, dx, dy) {
    var selectedLine = _getLine()
    selectedLine.pos.x += dx
    selectedLine.pos.y += dy
}

function drawLine(x, y, size, color, text) {
    gCtx.beginPath()
    gCtx.fillStyle = color
    gCtx.font = size + 'px inconsolata'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.fillText(text, x, y)
}

// function drawBorder(x, y, size = 120, color = 'green',txt) {
//     gCtx.font = size + 'px inconsolata' || getComputedStyle(document.body).font
//     var txtWidth = gCtx.measureText(txt).width
//     var margin = 20
    
//     gCtx.strokeStyle = color
//     gCtx.roundRect(
//         x - txtWidth / 2 - margin,
//         y - size / 1.5,
//         txtWidth  + margin * 2,
//         (size / 1.5) * 2,
//         25
//     )
//     gCtx.stroke()
// }

function drawBorder(x, y, size = 120, color = 'green', txt) {
    gCtx.font = size + 'px inconsolata' || getComputedStyle(document.body).font
    var txtWidth = gCtx.measureText(txt).width
    var margin = 20

    var topLeftX = x - txtWidth / 2 - margin
    var topLeftY = y - size / 1.5
    var width = txtWidth + margin * 2
    var height = (size / 1.5) * 2
    var bottomRightX = topLeftX + width
    var bottomRightY = topLeftY + height

    gCtx.strokeStyle = color
    gCtx.roundRect(topLeftX, topLeftY, width, height)
    gCtx.stroke()
}