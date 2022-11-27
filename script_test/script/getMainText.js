
var getContent = new Map();

    $('#mode-edition').on('click', () => {
        getContent.set($('#text-content').html());
        
    })

    for (const content of getContent) {
       // alert(content)
    }

export {getContent}