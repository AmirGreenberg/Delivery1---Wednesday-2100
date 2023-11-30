'use strict'
const BOX_MARGIN = 20
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']
const TEXTBOX_BORDER_COLOR = 'white'

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
            font: 'inconsolata',
            isDrag: false,
        },
        {
            pos: { x: gElCanvas.width / 2, y: (gElCanvas.height / 4) * 3 },
            txt: 'Shwarma !',
            size: 40,
            color: 'blue',
            font: 'inconsolata',
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

function drawBorder(selectedLine) {
    gCtx.font = '30px arial'
    gCtx.strokeStyle = TEXTBOX_BORDER_COLOR
    gCtx.roundRect(
        selectedLine.area.xStart,
        selectedLine.area.yStart,
        selectedLine.width,
        selectedLine.height,
        25
    )
    gCtx.stroke()
}

function onUpdateTxt(line, newTxt) {
    line.txt = newTxt
    updateArea(line)
}

function onUpdateFontSize(line, newSize) {
    line.font = newSize
    updateArea(line)
}

function onUpdateFontColor(line, newColor) {
    line.color = newColor
    updateArea(line)
}

function onUpdateFontType(line, newFont) {
    line.font = newFont
    updateArea(line)
}

function updateLinesAreas() {
    gMeme.lines.map((line) => updateArea(line))
}

function updateArea(line) {
    var font = line.size + 'pt ' + line.font
    gCtx.font = font || getComputedStyle(document.body).font
    line.width = gCtx.measureText(line.txt).width
    line.height = line.size + BOX_MARGIN

    line.area = {
        xStart: line.pos.x - line.width / 2,
        xEnd:
            line.pos.x -
            line.width / 2 -
            BOX_MARGIN +
            line.width +
            BOX_MARGIN * 2,
        yStart: line.pos.y - line.height / 2,
        yEnd: line.pos.y - line.height / 2 + line.height,
    }
}
