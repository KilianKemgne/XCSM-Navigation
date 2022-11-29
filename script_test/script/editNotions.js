let editContent = document.getElementById('edit-content')
let editor = new FroalaEditor('#editor');

$(document).ready(function () {
    //lert(localStorage.getItem('content'))

    if(localStorage.getItem('state') == 'true') {
        editor.html.set(localStorage.getItem('content'));
        $("#nav-list-details").replaceWith(localStorage.getItem('nav_bar_details'));
    }

    $('#save-notion').on('click', () => {
        alert(editor.html.get())
        
    })
})

    
    

