'use strict'

let gElCanvas
let gCtx
let gStartPos
let gShape = {}

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
    gShape = _loadUserToStorage()
    addListeners()

    document.getElementById('sSize').innerHTML = gShape.size
    document.getElementById('size').value = gShape.size

    const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
}

function renderCanvas() {
    renderShape()
}

function renderShape() {
    const { pos, color, size, text, shape } = getShape()

    drawArc(pos.x, pos.y, size, color, text, shape)
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()

    window.addEventListener('resize', () => {
        resizeCanvas()

        const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }

        createShape(
            center,
            gShape.size,
            gShape.color,
            gShape.text,
            gShape.shapes
        )
        renderCanvas()
    })
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
    gShape.pos = pos
    console.log('pos', pos)
    renderShape(pos)
    renderCanvas()

    setShapeDrag(true)
    gStartPos = pos
}

function onMove(ev) {
    const { isDrag } = getShape()
    if (!isDrag) return

    const pos = getEvPos(ev)

    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveShape(dx, dy)

    gStartPos = pos

    renderCanvas()
}

function onUp() {
    setShapeDrag(false)
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
