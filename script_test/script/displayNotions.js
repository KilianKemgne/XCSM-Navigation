let textContent = document.getElementById('text-content');

function displayNotions(Position) {
    fetch('../descriptionNotions.xml').then((response) => {
        response.text().then((xml) => {
            let xmlContent = xml;
            let parser = new DOMParser();
            let xmlDOM = parser.parseFromString(xmlContent, 'application/xml')
            let notions = xmlDOM.querySelectorAll('notion');
            
            notions.forEach((notion) => {
                if(notion.getAttribute('position') == Position){
                    fetch('../'+notion.id+'.xml').then((response) => {
                        response.text().then((xml) => {
                            let xmlContent = xml;
                            let parser = new DOMParser();
                            let xmlDOM = parser.parseFromString(xmlContent, 'application/xml');
                            let titre = xmlDOM.querySelector('titre');
                            let content;
                            if(titre !== null){
                                content = "<h3 class='card-header m-0 me-2 pb-3'>"+titre.textContent.toLocaleUpperCase()+"</h3>"
                            } else {
                                content = "<h3 class='card-header m-0 me-2 pb-3'>Titre Par Défaut</h3>"
                            }

                            let contenu = xmlDOM.querySelector('contenu');
                            
                            for (const child of contenu.children) {
                                if(child.nodeName == "texte"){
                                    content += "<br><p class='mx-4'>"+child.textContent+"</p>"
                                }
                                if (child.nodeName == "table") {
                                   content += "<br><div class='table-responsive mx-4'><table class='table table-bordered'>"+child.innerHTML+"</table></div>";
                                }
                                if(child.nodeName == "image"){
                                    content += "<br><img src='../"+child.textContent+"' >";
                                }
                                if (child.nodeName == "ul" | child.nodeName == "ol") {
                                    content += "<br><ul class='list-group list-group-numbered list-group-flush mx-4'>";
                                    for (const li of child.children) {
                                        content += "<li class='list-group-item'>"+li.textContent+"</li>";
                                    }
                                    if(child.nodeName == "ul"){
                                        content += "</ul>";
                                    } else {
                                        content += "</ol>";
                                    }
                                }
                            }

                            $("#text-content").replaceWith("<div class='col' id='text-content'>"+content+"</div>");
                        })
                    })
                                    
                } 
            });
        })
                    
    })
    
    
}

// function getNotionId(Position) {
//     let notionId;
//     fetch('../descriptionNotions.xml').then((response) => {
//         response.text().then((xml) => {
//             let xmlContent = xml;
//             let parser = new DOMParser();
//             let xmlDOM = parser.parseFromString(xmlContent, 'application/xml')
//             let notions = xmlDOM.querySelectorAll('notion');

//             notions.forEach((notion) => {
//                 if(notion.getAttribute('position') == Position){
//                     notionId = notion.id
                    
//                 } 
//             });
//             return notionId;
//         })
        
//     })
// }