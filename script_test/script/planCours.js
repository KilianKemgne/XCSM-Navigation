//let xmlContent = '';
let courseName = document.getElementById('course-name');
let node = document.getElementById('node');


fetch('../description.xml').then((response) => {
    response.text().then((xml) =>{
        let xmlContent = xml;
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

            let mainLi = document.createElement('li');
            mainLi.setAttribute("class", "menu-item")

            let main = document.createElement('a');
            main.innerText = partie.nodeName + ' ' + partie.id;
            main.setAttribute("class", "menu-link menu-toggle");
            
            let ul = document.createElement('ul');
            ul.setAttribute("class", "menu-sub");
            for (const chap of partie.children) {
                let a = document.createElement('a');
                a.innerText = chap.nodeName + ' ' + chap.id;
                a.setAttribute("class", "menu-link");
                a.setAttribute("href", "javascript:void(0)");

                let li = document.createElement('li');
                li.appendChild(a);
                li.setAttribute("class", "menu-item");
                
                ul.appendChild(li);
            }
            
            mainLi.append(main, ul);
            node.append(mainLi);
       });

       
    });
});
