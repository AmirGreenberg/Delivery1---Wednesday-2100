var gTrans = {
    appTitle: {
        en: "Eden's Book Shop",
        he: 'הספרייה של עדן',
    },
    addBook: {
        en: 'Add a new book:',
        he: 'הוסף ספר:',
    },
    addBookBtn: {
        en: 'Add Book',
        he: 'הוספה',
    },
    filterAndSort: {
        en: 'Filter & Sorting',
        he: 'סינון ומיון',
    },
    filterBy: {
        en: 'Filter by:',
        he: 'סינון:',
    },
    minRate: {
        en: 'Min Rate:',
        he: 'דירוג:',
    },
    sortBy: {
        en: 'Sort by:',
        he: 'מיון:',
    },
    selectSort: {
        en: 'Select Sorting',
        he: 'בחר מיון',
    },
    byName: {
        en: 'By Name',
        he: 'שם',
    },
    byRate: {
        en: 'By Rating',
        he: 'דירוג',
    },
    byPrice: {
        en: 'By Price',
        he: 'מחיר',
    },
    Descending: {
        en: 'Descending',
        he: 'סדר יורד',
    },
    prevPage: {
        en: 'Prev Page',
        he: 'עמוד קודם',
    },
    nextPage: {
        en: 'Next Page',
        he: 'עמוד הבא',
    },
    newPrice: {
        en: 'New price for:',
        he: 'מחיר חדש עבור:',
    },
    updateBook: {
        en: 'Update Book',
        he: 'עדכן ספר',
    },
    bookTitle: {
        en: 'Book Title:',
        he: 'שם הספר:',
    },
    bookPrice: {
        en: 'Book Price:',
        he: 'מחיר:',
    },
    bookId: {
        en: 'Book Id:',
        he: 'מספר זיהוי:',
    },
    bookRating: {
        en: 'Book Rating:',
        he: 'דירוג:',
    },
    CoffeRight: {
        en: 'CoffeRight to Eden',
        he: 'זכויות קפה לעדן',
    },
    expensive: {
        en: 'Expensive:',
        he: 'יקר:',
    },
    normal: {
        en: ', Normal:',
        he: ', רגיל:',
    },
    cheap: {
        en: ', Cheap:',
        he: ', זול:',
    },
    id: {
        en: 'Id',
        he: 'מספר זיהוי',
    },
    title: {
        en: 'Title',
        he: 'שם',
    },
    price: {
        en: 'Price',
        he: 'מחיר',
    },
    rating: {
        en: 'Rating',
        he: 'דירוג',
    },
    actions: {
        en: 'Actions',
        he: 'פעולות',
    },
    read: {
        en: 'Read',
        he: 'קרא',
    },
    update: {
        en: 'Update',
        he: 'עדכן',
    },
    delete: {
        en: 'Delete',
        he: 'מחק',
    },
}
var gLang

function doTrans() {
    const els = document.querySelectorAll('[data-trans]')
    els.forEach((el) => {
        const transKey = el.dataset.trans
        const trans = getTrans(transKey)
        el.innerText = trans
    })

    return gLang
}

function getTrans(transKey) {
    return gTrans[transKey][gLang]
}

function getGlang() {
    return gLang
}

function setLang(lang) {
    gLang = lang
}
