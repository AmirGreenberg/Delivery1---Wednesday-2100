'use strict'
const BOX_MARGIN = 20
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']
const TEXTBOX_BORDER_COLOR = 'white'

let gElCanvas
let gElCanvasContainer
let gElTextContainer
let gCtx
let gStartPos
let gCurrPage
var gCurrImg
var gSelectedLine

gElTextContainer = document.querySelector('.text-container')
gElCanvas = document.querySelector('canvas')
gElCanvasContainer = document.querySelector('.canvas-container')
gCtx = gElCanvas.getContext('2d')

var gImgs = [
    {
        id: 0,
        url: 'http://127.0.0.1:5500/img/1.jpg',
        keywords: ['funny', 'cat'],
    },
    { id: 1, url: './img/2.jpg', keywords: ['funny', 'cat'] },
]
var gMeme = {
    selectedImgId: '0',
    selectedLineIdx: '0',
    lines: [
        {
            pos: { x: gElCanvas.width / 2 - 20, y: gElCanvas.height / 5 },
            txt: 'Falafel Falafel Falafel!',
            size: 20,
            color: 'white',
            stroke: 'black',
            font: 'impact',
            isDrag: false,
        },
        {
            pos: { x: gElCanvas.width / 2 - 20, y: (gElCanvas.height / 4) * 3 },
            txt: 'Shawarma !',
            size: 40,
            color: 'white',
            stroke: 'black',
            font: 'impact',
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

function drawLine(x, y, size, color, stroke, text) {
    gCtx.beginPath()
    gCtx.lineWidth = '6'
    gCtx.strokeStyle = stroke
    gCtx.fillStyle = color
    gCtx.font = size + 'px impact'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.strokeText(text, x, y)
    gCtx.fillText(text, x, y)
}

function drawBorder(selectedLine) {
    gCtx.strokeStyle = TEXTBOX_BORDER_COLOR
    gCtx.roundRect(
        selectedLine.area.xStart,
        selectedLine.area.yStart,
        selectedLine.width,
        selectedLine.height,
        25
    )
    gCtx.lineWidth = '2'
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

function onChangeText(txt) {
    var currLine = _getLine()
    currLine.txt = txt
    renderMeme()
}

function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent
}

function onUploadImg() {
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg')

    function onSuccess(uploadedImgUrl) {
        const url = encodeURIComponent(uploadedImgUrl)
        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`
        )
    }

    doUploadImg(imgDataUrl, onSuccess)
}

function doUploadImg(imgDataUrl, onSuccess) {
    const formData = new FormData()
    formData.append('img', imgDataUrl)

    const XHR = new XMLHttpRequest()
    XHR.onreadystatechange = () => {
        if (XHR.readyState !== XMLHttpRequest.DONE) return
        if (XHR.status !== 200) return console.error('Error uploading image')
        const { responseText: url } = XHR
        console.log('Got back live url:', url)
        onSuccess(url)
    }
    XHR.onerror = (req, ev) => {
        console.error(
            'Error connecting to server with request:',
            req,
            '\nGot response data:',
            ev
        )
    }
    XHR.open('POST', '//ca-upload.com/here/upload.php')
    XHR.send(formData)
}

function _getImg() {
    return gCurrImg
}

function _getLine() {
    return gSelectedLine
}

function handleOnDown(pos) {
    var currLineIdx = isLineClicked(pos)
    if (currLineIdx === -1) {
        gMeme.selectedLineIdx = null
        gSelectedLine = null
        renderMeme()
        return
    }
    gMeme.selectedLineIdx = currLineIdx.toString()
    gSelectedLine = gMeme.lines[gMeme.selectedLineIdx]

    setLineDrag(true)
    gStartPos = pos
    renderMeme()
}

