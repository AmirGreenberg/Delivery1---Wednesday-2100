'use strict'

function saveToStorage(key, value) {
    const strVal = JSON.stringify(value)
    console.log(
        '🚀 ~ file: util.service.js:7 ~ saveToStorage ~ strVal:',
        strVal
    )

    localStorage.setItem(key, strVal)
}

function loadFromStorage(key) {
    var strVal = localStorage.getItem(key)
    return JSON.parse(strVal)
}
