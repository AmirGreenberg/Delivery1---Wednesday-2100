'use strict'

function onInit() {
    addListeners()
    resizeCanvas()
    gCurrImg = initImg(gImgs[0].url)
    setTimeout(() => renderMeme(), 100)
}

function initImg(imgUrl = '/meme-imgs-square/1.jpg') {
    var img = new Image()
    img.src = imgUrl
    return img
}

function renderMeme() {
    renderImg(gCurrImg)
    renderLines(gMeme.lines)
}

function renderImg() {
    var img = _getImg()
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function _getImg() {
    return gCurrImg
}

function renderLines(lines) {
    lines.forEach((line) => renderLine(line))
}

function renderLine(line) {
    const { pos, size, color, txt } = line
    drawLine(pos.x, pos.y, size, color, txt)
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
    if (!currLineIdx) return
    console.log('check')
    setLineDrag(currLineIdx)
}

function isLineClicked(clickedPos) {
    return gMeme.lines.findIndex((line) => {
        const distance = Math.sqrt(
            (line.pos.x - clickedPos.x) ** 2 + (line.pos.y - clickedPos.y) ** 2
        )
        console.log(distance <= line.size*1.5)
        return distance <= line.size*1.5
    })
}

function setLineDrag(currLineIdx) {
    gMeme.lines[currLineIdx].isDrag = true
    

}

function onMove(ev) {
    // const { isDrag } = getLine()
    // if (!isDrag) return
    // const pos = getEvPos(ev)
    // const dx = pos.x - gStartPos.x
    // const dy = pos.y - gStartPos.y
    // moveLine(dx, dy)
    // gStartPos = pos
    // renderCanvas()
}

function onUp() {
    setLineDrag(false)
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
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
