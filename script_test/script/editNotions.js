let editContent = document.getElementById('edit-content')
let editor = new FroalaEditor('#editor');

//var XMLWriter = require('xml-writer');

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
            } else if (child.nodeName == 'P') {
                if (child.nodeName == 'P' && child.textContent !== '') {
                    xmlContent += "<texte>"+ child.textContent +"</texte>"
                } else if (child.nodeName == 'table') {
                    xmlContent += "<table>"+ child.innerHTML +"</table>"
                } else if (child.nodeName == 'img') {
                    console.log(child.nodeName);
                    xmlContent += "<image>"+ child.getAttribute('src').split('/')[1] +"</image>"
                } else if (child.nodeName == 'video') {
                    xmlContent += "<video>"+ child.getAttribute('src').split('/')[1] +"</video>"
                }
            } 
        };

        console.log(xmlContent);

        // fetch('../'+localStorage['currentNotion']+'.xml').then((response) => {
        //     response.text().then((xml) => {
        //         alert(localStorage['currentNotion'])
        //         let xmlContent1 = xml; 
        //         let parser1 = new DOMParser();
        //         let xmlDOM1 = parser1.parseFromString(xmlContent1, 'text/xml');
        //         let titre1 = xmlDOM1.querySelector('titre');
        //         titre1.textContent = edit.children[0].textContent;
        //     })
        // })

        
        // var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        // var fso = new ActiveXObject("Scripting.FileSystemObject")
        //                             .OpenTextFile('../'+localStorage['currentNotion']+'.xml',2,true)
        //                             .Write("cequetuveuxmarquerdedans.");;
        // // var FILENAME='../'+localStorage['currentNotion']+'.xml';
        // // var file = fso.CreateTextFile(FILENAME, true);
        // file.WriteLine('<?xml version="1.0" encoding="utf-8"?>\n');
        // file.WriteLine('<PersonInfo>\n');
        // file.WriteLine('></Person>\n');
        // file.WriteLine('</PersonInfo>\n');
        // file.Close();
        
          
        //     var v = new  XMLWriter();
        //     v.writeStartDocument(true);
        //     v.writeElementString('test','Hello World');
        //     v.writeAttributeString('foo','bar');
        //     v.writeEndDocument();
        //     console.log( v.flush() );
        //  alert(v.flush())

        // var xhttp = new XMLHttpRequest();
        // xhttp.onreadystatechange = function() {
        //     if (xhttp.readyState == 4 && xhttp.status == 200) {

        //         var xmlDoc = xhttp.responseXML; //important to use responseXML here
        //     }
        //     xhttp.open("GET", '../'+localStorage['currentNotion']+'.xml', true);
        //     xhttp.send();
        //     alert('yes')
        // }

    //     function loadXMLDoc(filename){
    //         if (window.XMLHttpRequest){
    //             xhttp=new XMLHttpRequest();
    //         }
    //         else {
    //             xhttp=new ActiveXObject("Microsoft.XMLHTTP"); //code for IE 5-6
    //         }
    //         xhttp.open("GET",filename,false);
    //         xhttp.send();
    //         alert('yes')
    //         return xhttp.responseXML;
    //     }

    //     loadXMLDoc('../'+localStorage['currentNotion']+'.xml')

    //     function writeXML() 
    // {
    //     //var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
    //     ActiveXObject = window.ActiveXObject;
    //     var fso = new ActiveXObject("Scripting.FileSystemObject");
    //     var FILENAME='../'+localStorage['currentNotion']+'.0.xml';
    //     var file = fso.CreateTextFile(FILENAME, true);
    //     file.WriteLine('<?xml version="1.0" encoding="utf-8"?>\n');
    //     file.WriteLine('<PersonInfo>\n');
    //     file.WriteLine('></Person>\n');
    //     file.WriteLine('</PersonInfo>\n');
    //     file.Close();
    // } 
    // writeXML()
    })
})



    
    

