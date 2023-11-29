'use strict'

function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()
    reader.onload = function (event) {
        let img = new Image()
        img.src = event.target.result
        img.onload = () => onImageReady(img)
    }
    reader.readAsDataURL(ev.target.files[0])
}

// function renderImg(img) {
//     console.log(
//         '🚀 ~ file: upload-from-local.service.js:18 ~ renderImg ~ img:',
//         img
//     )
//     var image = createImageBitmap(img)
//     console.log("🚀 ~ file: upload-from-local.service.js:23 ~ renderImg ~ image:", image)
//     gCtx.drawImage(image, 0, 0, gElCanvas.width, gElCanvas.height)
// }
