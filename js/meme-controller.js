'use strict'

function onInit() {
    addListeners()
    resizeCanvas()
    updateLinesAreas()
    gCurrImg = initImg(gImgs[0].url)
    gSelectedLine = gMeme.lines[0]
    gElTextContainer.value = gSelectedLine.txt
    setTimeout(() => renderMeme(), 100)
}

function initImg(imgUrl = '/meme-imgs-square/1.jpg') {
    var img = new Image()
    img.src = imgUrl
    return img
}

function renderMeme() {
    updateLinesAreas()
    renderImg()
    renderBorder()
    renderLines(gMeme.lines)
    // renderText()
}

function renderImg() {
    var img = _getImg()
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function _getImg() {
    return gCurrImg
}

function renderBorder() {
    var selectedLine = _getLine()
    drawBorder(selectedLine)
}

function _getLine() {
    return gSelectedLine
}

function renderLines(lines) {
    lines.forEach((line) => {
        renderLine(line)
    })
}

function renderLine(line) {
    const { pos, size, color, stroke, txt } = line
    drawLine(pos.x, pos.y, size, color, stroke, txt)
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    var currLineIdx = isLineClicked(pos)
    if (currLineIdx === -1) {
        gMeme.selectedLineIdx = null
        gSelectedLine = null
        return
    } else {
        gMeme.selectedLineIdx = currLineIdx.toString()
        gSelectedLine = gMeme.lines[gMeme.selectedLineIdx]

        setLineDrag(true)
        gStartPos = pos
        renderMeme()
    }
}

function isLineClicked(clickedPos) {
    return gMeme.lines.findIndex((line) => {
        return (
            clickedPos.x >= line.area.xStart &&
            clickedPos.x <= line.area.xEnd &&
            clickedPos.y >= line.area.yStart &&
            clickedPos.y <= line.area.yEnd
        )
    })
}

function setLineDrag(isTrue) {
    var selectedLine = _getLine()
    selectedLine.isDrag = isTrue
    gElCanvasContainer.style.cursor = isTrue ? 'grab' : 'pointer'
}

function onMove(ev) {
    var selectedLine = _getLine()
    if (!selectedLine || !selectedLine.isDrag) return
    const pos = getEvPos(ev)

    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveLine(pos, dx, dy)
    gStartPos = pos
    renderMeme()
}

function onUp() {
    var selectedLine = _getLine()
    if (!selectedLine) return
    setLineDrag(false)
    gElTextContainer.value = selectedLine.txt
    gElTextContainer.focus()
}

function resizeCanvas() {
    gElCanvas.width = gElCanvasContainer.offsetWidth
    gElCanvas.height = gElCanvasContainer.offsetHeight
}

function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVS.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}
