
let getContent
    $('#mode-edition').on('click', () => {
        getContent = $('#text-content').prop("innerHTML")
    })


export {getContent}