var tagify = new Tagify(document.querySelector('input[name=tags3-1]'), {
    delimiters : null,
    tagTemplate : function(v, tagData){
    return `<tag title='${v}'>
                    <x title=''></x>
                    <div>
                        <img onerror="this.style.visibility = 'hidden'" src='https://lipis.github.io/flag-icon-css/flags/4x3/${tagData.code.toLowerCase()}.svg'>
                        <span class='tagify__tag-text'>${v}</span>
                    </div>
                </tag>`;
    },
    enforceWhitelist : true,
    whitelist : [
      { value:'Afghanistan', code:'AF' },
      { value:'Åland Islands', code:'AX' }
    ],
    dropdown : {
        enabled: 1, // suggest tags after a single character input
        classname : 'extra-properties', // custom class for the suggestions dropdown
        itemTemplate : function(tagData){
        return `<div class='tagify__dropdown__item ${tagData.class ? tagData.class : ""}'>
                        <img onerror="this.style.visibility = 'hidden'"
                             src='https://lipis.github.io/flag-icon-css/flags/4x3/${tagData.code.toLowerCase()}.svg'>
                        <span>${tagData.value}</span>
                    </div>`
        }
    },
    mapValueToProp : "code", // map tags' values to this property name, so this property will be the actual value and not the printed value on the screen
})

tagify.on('click', function(e){
    console.log(e.detail);
});

tagify.on('remove', function(e){
    console.log(e.detail);
});

tagify.on('add', function(e){
    console.log( "original Input:", tagify.DOM.originalInput);
    console.log( "original Input's value:", tagify.DOM.originalInput.value);
    console.log( "event detail:", e.detail);
});

// add the first 2 tags from the "allowedTags" Aray automatically
tagify.addTags(tagify.settings.whitelist.slice(0,2));