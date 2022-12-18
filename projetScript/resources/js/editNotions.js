Neutralino.init();
let editContent = document.getElementById('edit-content')
let editor = new FroalaEditor('#editor');

$(document).ready(function () {

    if(localStorage.getItem('state') == 'true') {
        editor.html.set(localStorage.getItem('content'));
        $("#nav-list-details").replaceWith(localStorage.getItem('nav_bar_details'));
    }

    $('#save-notion').on('click', () => {
        let edit = document.createElement('div');
        edit.innerHTML = editor.html.get();
        let xmlContent = "<?xml version='1.0'?><notion label='Notion par defaut'>"

        for (const child of edit.children) {
            console.log(child.nodeName);
            if(edit.firstChild == child){
                xmlContent += "<titre>"+ child.textContent +"</titre><contenu>"
            } else if (child.nodeName == 'P' ) {
                if (child.nodeName == 'P' && child.textContent !== '' && child.childElementCount == 0) {
                    xmlContent += "<texte>"+ child.textContent +"</texte>"
                } else if (child.childElementCount !== 0) {
                    console.log(child.children[0]);
                    printChild(child)
                }
            }  else if(child.nodeName == 'SPAN' | child.nodeName == 'DIV'){
                printChild(child)
            } else if (child.nodeName == 'TABLE') {
                xmlContent += "<table>"+ child.innerHTML +"</table>"
            } else if (child.nodeName == 'UL') {
                xmlContent += "<ul>"+ child.innerHTML +"</ul>";
            } else if (child.nodeName == 'OL') {
                xmlContent += "<ol>"+ child.innerHTML +"</ol>";
            }
        };

        function printChild(child) {          
            for (const fils of child.children) {
                console.log(fils.nodeName)
                if (fils.nodeName == 'P' && fils.textContent !== '' && child.childElementCount == 0) {
                    xmlContent += "<texte>"+ fils.textContent +"</texte>"
                } else if (fils.nodeName == 'TABLE') {
                    xmlContent += "<table>"+ fils.innerHTML +"</table>"
                } else if (fils.nodeName == 'IMG') {
                    if (fils.getAttribute('src').indexOf('Blob') == -1) {
                        xmlContent += "<image>'"+ fils.getAttribute('src') +"'</image>"
                    }else {
                        xmlContent += "<image>"+ fils.getAttribute('src').split('/')[1] +"</image>"
                    }
                } else if (fils.nodeName == 'VIDEO') {
                    if (fils.getAttribute('src').indexOf('Blob') == -1) {
                        xmlContent += "<video>'"+ fils.getAttribute('src') +"'</video>"
                    }else {
                        xmlContent += "<video>"+ fils.getAttribute('src').split('/')[1]+'/'+fils.getAttribute('src').split('/')[2] +"</video>"
                    }
                } else if(fils.nodeName == 'SPAN' ){
                    printChild(fils)
                }
            }
        }

        xmlContent += "</contenu></notion>"
        console.log(xmlContent);
        Neutralino.filesystem.writeFile('./result.xml', xmlContent);
  
    })
})



    
    

