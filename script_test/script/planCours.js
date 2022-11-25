
let xmlContent = '';
let NotionList = document.getElementById('desc-notions');
let courseName = document.getElementById('course-name');
let nodeList = document.getElementById('node-desc');
let node = document.getElementById('node');


fetch('../description.xml').then((response) => {
    response.text().then((xml) =>{
        xmlContent = xml;
        let parser = new DOMParser();
        let xmlDOM = parser.parseFromString(xmlContent, 'application/xml');
        let parties = xmlDOM.querySelectorAll('partie')
        //console.log(parties.length);
        let default_name = 'Nom par default'
        if(xmlDOM.querySelector('cours').hasAttribute('titre') && (xmlDOM.querySelector('cours').getAttribute('titre') !== '') ){
            courseName.innerText = 'Cours : '+xmlDOM.querySelector('cours').getAttribute('titre');
        } else {
            courseName.innerText = 'Cours : '+default_name;
        }
        // arbo(parties)
        // function arbo() {
        //     parties.forEach((partie) => {
        //         if (partie.childElementCount > 1) {
        //             arbo(partie)
        //         } else {
        //             if(partie.children[0].childElementCount == 0){
        //                 let li = document.createElement('li');
        //                 li.innerText = partie.children[0].nodeName + ' ' + partie.children[0].id;
        //                 let ul = document.createElement('ul');
        //                 NotionList.appendChild(li)
                        
        //             } else {
        //                 arbo(partie.children[0]);
        
        //             }
        //         }
        
        //     });
        // }
        
        parties.forEach((partie) => {
            let main = document.createElement('a');
            main.innerText = partie.nodeName + ' ' + partie.id;
            main.setAttribute("class", "menu-link menu-toggle");
            let li = document.createElement('li');
            let a = document.createElement('a');
   
            a.innerText = partie.children[0].nodeName + ' ' + partie.children[0].id;
            a.setAttribute("class", "menu-link");
            li.appendChild(a);
            li.setAttribute("class", "menu-item");
            //li.appendChild(li);
   
            NotionList.appendChild(li);
            nodeList.append(main, NotionList);
            node.append(nodeList);
       });

       
    });
});
