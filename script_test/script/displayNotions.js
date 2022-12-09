let textContent = document.getElementById('text-content');
let nav_details = document.getElementById('nav-list-details');
var content = textContent.innerHTML;
var state = false;
var nav_bar_details = "<ol class='breadcrumb breadcrumb-style1 my-2' id='nav-list-details'><li class='breadcrumb-item'><a href='index.html'>XCSM</a></li><li class='breadcrumb-item'><a href='index.html'>Edition</a></li>";
var nav_bar_detail = "<ol class='breadcrumb breadcrumb-style1 my-2' id='nav-list-details'><li class='breadcrumb-item'><a href='index.html'>XCSM</a></li><li class='breadcrumb-item'><a href='index.html'>Edition</a></li>";

localStorage.setItem('content', content);
localStorage.setItem('state', 'false');

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
                            let xmlContent1 = xml;
                            let parser1 = new DOMParser();
                            let xmlDOM1 = parser1.parseFromString(xmlContent1, 'application/xml');
                            let titre1 = xmlDOM1.querySelector('titre');
                            
                            if(titre1 !== null){
                                content = "<h3 class='card-header m-0 me-2 pb-3'>"+titre1.textContent.toLocaleUpperCase()+"</h3>"
                            } else {
                                content = "<h3 class='card-header m-0 me-2 pb-3'>Titre Par Défaut</h3>"
                            }

                            let contenu = xmlDOM1.querySelector('contenu');
                            
                            for (const child of contenu.children) {
                                if(child.nodeName == "texte"){
                                    content += "<br><p class='mx-4'>"+child.textContent+"</p>"
                                }
                                if (child.nodeName == "table") {
                                   content += "<br><div class='table-responsive mx-4'><table class='table table-bordered'>"+child.innerHTML+"</table></div>";
                                }
                                if(child.nodeName == "image"){
                                    content += "<br><img src='../"+child.textContent+"' class='mx-4'>";
                                }
                                if (child.nodeName == "ul" | child.nodeName == "ol") {
                                    content += "<br><ul class='list-group list-group-numbered list-group-flush mx-4 mb-4'>";
                                    for (const li of child.children) {
                                        content += "<li class='list-group-item'>"+li.textContent+"</li>";
                                    }
                                    if(child.nodeName == "ul"){
                                        content += "</ul>";
                                    } else {
                                        content += "</ol>";
                                    }
                                }
                                if (child.nodeName == "video") {
                                    content += "<video class='mx-4 mb-3' style='width: 80%;' src='../"+child.textContent+"' controls>Your browser does not support HTML5 video.</video>"
                                }
                            }
                            nav_bar_details = "<ol class='breadcrumb breadcrumb-style1 my-2' id='nav-list-details'><li class='breadcrumb-item'><a href='index.html'>XCSM</a></li>"+
                            "<li class='breadcrumb-item'><a href='index.html'>"+notion.getAttribute('titrePartie')+"</a></li>"+
                            "<li class='breadcrumb-item'><a href='index.html'>"+notion.getAttribute('titreChapitre')+"</a></li>"+
                            "<li class='breadcrumb-item'><a href='index.html'>"+notion.getAttribute('titreParagraphe')+"</a></li>"+
                            "<li class='breadcrumb-item'><a href='index.html'>"+notion.getAttribute('titre')+"</a></li>"
                            fetch('../description.xml').then((response) => {
                                response.text().then((xml) =>{
                                    let xmlContent = xml;
                                    let parser = new DOMParser();
                                    let xmlDOM = parser.parseFromString(xmlContent, 'application/xml');
                                    let parties = xmlDOM.querySelectorAll('partie')

                                    let nav = notion.id.split('_');
                                    nav_bar_detail = "<ol class='breadcrumb breadcrumb-style1 my-2' id='nav-list-details'><li class='breadcrumb-item'><a href='index.html'>XCSM</a></li>"+
                                    "<li class='breadcrumb-item'><a href='index.html'>"+parties[nav[3]-1].nodeName+" "+parties[nav[3]-1].id+"</a></li>"+
                                    "<li class='breadcrumb-item'><a href='index.html'>"+parties[nav[3]-1].children[nav[2]-1].nodeName+" "+parties[nav[3]-1].children[nav[2]-1].id+"</a></li>"+
                                    "<li class='breadcrumb-item'><a href='index.html'>"+parties[nav[3]-1].children[nav[2]-1].children[nav[1]-1].nodeName+" "+parties[nav[3]-1].children[nav[2]-1].children[nav[1]-1].id+"</a></li>"+
                                    "<li class='breadcrumb-item'><a href='index.html'>"+parties[nav[3]-1].children[nav[2]-1].children[nav[1]-1].children[nav[0]-1].nodeName+" "+parties[nav[3]-1].children[nav[2]-1].children[nav[1]-1].children[nav[0]-1].id+"</a></li>"
                                    $("#nav-list-detail").replaceWith(nav_bar_detail);
                                }) 
                            })
                            $("#nav-list-details").replaceWith(nav_bar_details);
                            $("#text-content").replaceWith("<div class='col' id='text-content'>"+content+"</div>");
                        })
                    })        
                } 
            });
        })        
    }) 
}

$('#mode-edition').on('click', () => {
    localStorage['state'] = 'true';
    localStorage['content'] = content;
    localStorage.setItem('nav_bar_details', nav_bar_details);
})

function dateDiff(date1, date2){
    var diff = {}                           // Initialisation du retour
    var tmp = date2 - date1;
 
    tmp = Math.floor(tmp/1000);             // Nombre de secondes entre les 2 dates
    diff.sec = tmp % 60;                    // Extraction du nombre de secondes
 
    tmp = Math.floor((tmp-diff.sec)/60);    // Nombre de minutes (partie entière)
    diff.min = tmp % 60;                    // Extraction du nombre de minutes
 
    tmp = Math.floor((tmp-diff.min)/60);    // Nombre d'heures (entières)
    diff.hour = tmp % 24;                   // Extraction du nombre d'heures
     
    tmp = Math.floor((tmp-diff.hour)/24);   // Nombre de jours restants
    diff.day = tmp;
     
    return diff;
}
localStorage.setItem('howlong', 0)
$('body').on('DOMSubtreeModified', '#main-text-content', () => {
    let date = new Date();
    let datedif = dateDiff(date, (new Date(localStorage.getItem('howlong'))));
    localStorage.setItem('prev', date)
    localStorage.setItem('dif', datedif)
    console.log(datedif.sec);
})