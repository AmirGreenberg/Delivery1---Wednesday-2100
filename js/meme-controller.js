'use strict'

function onInit() {
    initCanvas()
    gLine = _loadUserFromStorage()
    addListeners()
    // resizeCanvas()

    // document.getElementById('sSize').innerHTML = gLine.size
    // document.getElementById('size').value = gLine.size

}

function renderCanvas() {
    renderLine()
}

function initCanvas() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    var img = new Image()
    img.src = '/meme-imgs-square/1.jpg'
    img.onload = function (e) {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}

function renderLine() {
    const { pos, color, size, text, line } = getLine()

    drawLine(pos.x, pos.y, size, color, text, line)
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()

    window.addEventListener('resize', () => {
        
        var center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
        createLine(center, gLine.size, gLine.color, gLine.text, gLine.lines)
        
        renderCanvas()
        // resizeCanvas()
    })
}

function onSubmit(ev) {
    ev.preventDefault()
    console.log('check: ')

    var line = {
        color: document.querySelector('[name=color]').value,
        line: document.querySelector('[name=line]').value,
        text: document.querySelector('[name=text]').value,
        size: document.querySelector('[name=size]').value,
    }

    gLine = line
    _saveUserToStorage()

    console.log('gLine', gLine)
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
    gLine.pos = pos
    console.log('pos', pos)
    renderLine(pos)
    renderCanvas()

    setLineDrag(true)
    gStartPos = pos
}

function onMove(ev) {
    const { isDrag } = getLine()
    if (!isDrag) return

    const pos = getEvPos(ev)

    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveLine(dx, dy)

    gStartPos = pos

    renderCanvas()
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
