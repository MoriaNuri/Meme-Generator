var gTrans = {
    'logo': {
        en: 'Meme Generator',
        he: 'מחולל הממים'
    },
    'gallery': {
        en: 'Gallery',
        he: 'גלריה',
    },
    'about': {
        en: 'About',
        he: 'אודות',
    },
    'Search': {
        en: 'Search',
        he: 'חפש'
    },
    'more': {
        en: 'More',
        he: 'עוד',
    },
    'input-text': {
        en: 'Enter your text',
        he: 'הכנס טקסט',
    },
    'share': {
        en: 'Share',
        he: 'שתף',
    },
    'download': {
        en: 'Download',
        he: 'הורדה',
    },
    'pets': {
        en: 'Pets',
        he: 'חיות מחמד',
    },
    'kids': {
        en: 'Kids',
        he: 'ילדים'
    },
    'politic': {
        en: 'politic',
        he: 'פוליטיקה'
    },

}

var gCurrLang = 'en';

function getTrans(transKey) {
    var keyTrans = gTrans[transKey]
    console.log(keyTrans);
    console.log(gCurrLang);

    // TODO: if key is unknown return 'UNKNOWN'
    if (!keyTrans) return 'UNKNOWN'
        // TODO: get from gTrans

    var txt = keyTrans[gCurrLang];
    // TODO: If translation not found - use english
    if (!txt) return keyTrans.en

    return txt
}

function doTrans() {
    // TODO: 
    var els = document.querySelectorAll('[data-trans]')
    console.log(els);

    // for each el:
    //    get the data-trans and use getTrans to replace the innerText 
    els.forEach(function(el) {
        // console.dir(el)
        var txt = getTrans(el.dataset.trans)

        if (el.nodeName === 'INPUT') el.placeholder = txt;
        else el.innerText = txt
            //    ITP: support placeholder  

        // console.log('el.dataset', el.dataset.trans);       
    })
}

function setLang(lang) {
    gCurrLang = lang;
}

function formatNumOlder(num) {
    return num.toLocaleString('es')
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
    return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num);
}

function formatDate(time) {

    var options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    return new Intl.DateTimeFormat(gCurrLang, options).format(time);
}

function kmToMiles(km) {
    return km / 1.609;
}