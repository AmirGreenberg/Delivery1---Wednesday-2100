'use strict'

function createShape(pos, size = 10, color = '#0000ff', text = 'Text', shape) {
    gShape = {
        pos,
        size,
        color,
        isDrag: false,
        text,
        shape,
    }
}

function getShape() {
    return gShape
}

function isShapeClicked(clickedPos) {
    const { pos } = gShape
    const distance = Math.sqrt(
        (pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2
    )
    return distance <= gShape.size
}

function setShapeDrag(isDrag) {
    gShape.isDrag = isDrag
}

function moveShape(dx, dy) {
    gShape.pos.x += dx
    gShape.pos.y += dy
}

var prevEvent, currentEvent
document.documentElement.onmousemove = function (event) {
    currentEvent = event
}
var prevSpeed = 0
setInterval(function () {
    if (prevEvent && currentEvent) {
        var movementX = Math.abs(currentEvent.screenX - prevEvent.screenX)
        var movementY = Math.abs(currentEvent.screenY - prevEvent.screenY)
        var movement = Math.sqrt(movementX * movementX + movementY * movementY)
        var speed = 10 * movement
        gShape.size = speed / 100
    }

    prevEvent = currentEvent
    prevSpeed = speed
}, 100)

function drawArc(x, y, size, color, text, shape) {
    switch (shape) {
        case 'Brush' || 'Pencil' || 'Circle':
            gCtx.beginPath()
            gCtx.arc(x, y, size, 0, 2 * Math.PI)
            gCtx.strokeStyle = color
            gCtx.stroke()
            gCtx.fillStyle = color
            gCtx.fill()
            break

        case 'Triangle':
            gCtx.beginPath()
            gCtx.moveTo(x, y)
            gCtx.lineTo(x + 40, y + 40)
            gCtx.lineTo(x - 40, y + 40)
            gCtx.strokeStyle = color
            gCtx.stroke()
            gCtx.closePath()
            gCtx.fillStyle = color
            gCtx.fill()
            break

        case 'Rectangle':
            gCtx.beginPath()
            gCtx.fillStyle = color
            gCtx.strokeRect(x, y, size, size)
            gCtx.fillRect(x, y, size, size)
            gCtx.strokeStyle = color
            gCtx.stroke()
            break

        case 'Text':
            gCtx.beginPath()
            gCtx.fillStyle = color
            gCtx.font = size + 'px inconsolata'
            gCtx.textAlign = 'center'
            gCtx.textBaseline = 'middle'
            gCtx.fillText(text, x, y)
            break

        default:
            gCtx.beginPath()
            gCtx.arc(x, y, size, 0, 2 * Math.PI)
            gCtx.strokeStyle = color
            gCtx.stroke()
            gCtx.fillStyle = color
            gCtx.fill()
            break
    }
}
