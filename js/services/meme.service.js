'use strict'
const STORAGE_USER_KEY = 'userDB'
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

let gElCanvas
let gCtx
let gStartPos
let gLine = {}

function _saveUserToStorage() {
    saveToStorage(STORAGE_USER_KEY, gLine)
}

function _loadUserFromStorage() {
    return loadFromStorage(STORAGE_USER_KEY)
}

function showSize(newVal) {
    document.getElementById('sSize').innerHTML = newVal
}

function createLine(pos, size = 10, color = '#0000ff', text = 'Text', line) {
    gLine = {
        pos,
        size,
        color,
        isDrag: false,
        text,
        line,
    }
}

function getLine() {
    return gLine
}

function isLineClicked(clickedPos) {
    const { pos } = gLine
    const distance = Math.sqrt(
        (pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2
    )
    return distance <= gLine.size
}

function setLineDrag(isDrag) {
    gLine.isDrag = isDrag
}

function moveLine(dx, dy) {
    gLine.pos.x += dx
    gLine.pos.y += dy
}

function drawLine(x, y, size, color, text) {
    gCtx.beginPath()
    gCtx.fillStyle = color
    gCtx.font = size + 'px inconsolata'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.fillText(text, x, y)
}
