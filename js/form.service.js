'use strict'
const STORAGE_USER_KEY = 'userDB'

function onSubmit(ev) {
    ev.preventDefault()
    console.log('check: ')

    var shape = {
        color: document.querySelector('[name=color]').value,
        shape: document.querySelector('[name=shape]').value,
        text: document.querySelector('[name=text]').value,
        size: document.querySelector('[name=size]').value,
    }

    gShape = shape
    _saveUserToStorage()

    console.log('gShape', gShape)
}

function _saveUserToStorage() {
    saveToStorage(STORAGE_USER_KEY, gShape)
}

function _loadUserToStorage() {
    return loadFromStorage(STORAGE_USER_KEY)
}

function showSize(newVal) {
    document.getElementById('sSize').innerHTML = newVal
}

function updateSize(shape) {
    console.log('shape: ', shape)
    var shapeSize = setShapeSize(shape)

    document.getElementById('sSize').innerHTML = shapeSize
    document.getElementById('size').value = shapeSize
}

function setShapeSize(shape) {
    switch (shape) {
        case 'Brush':
            return 10

        case 'Pencil':
            return 3

        case 'Triangle':
            return 40

        case 'Rectangle':
            return 40

        case 'Circle':
            return 40

        case 'Text':
            return 40

        default:
            break
    }
}
