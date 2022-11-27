
let courseName = document.getElementById('course-name');
let node = document.getElementById('node');

fetch('../description.xml').then((response) => {
    response.text().then((xml) =>{
        let xmlContent = xml;
        let parser = new DOMParser();
        let xmlDOM = parser.parseFromString(xmlContent, 'application/xml');
        let parties = xmlDOM.querySelectorAll('partie')
        let default_name = 'Nom par default'
        if(xmlDOM.querySelector('cours').hasAttribute('titre') && (xmlDOM.querySelector('cours').getAttribute('titre') !== '') ){
            courseName.innerText = 'Cours : '+xmlDOM.querySelector('cours').getAttribute('titre');
        } else {
            courseName.innerText = 'Cours : '+default_name;
        }  
        parties.forEach((partie) => {

            let mainLi = document.createElement('li');
            mainLi.setAttribute("class", "menu-item")

            let main = document.createElement('a');
            main.innerText = partie.nodeName + ' ' + partie.id;
            main.setAttribute("class", "menu-link menu-toggle");
            
            let ul = document.createElement('ul');
            ul.setAttribute("class", "menu-sub");

            function addChild(chap, li) {
                let ul = document.createElement('ul');
                    ul.setAttribute("class", "menu-sub ms-3"); 
                for (const chapter of chap.children) {
                    let a = document.createElement('a');
                    a.innerText = chapter.nodeName + ' ' + chapter.id;
                    if(chapter.childElementCount == 0){
                        a.setAttribute("class", "menu-link");
                        let li1 = document.createElement('li');
                        li1.appendChild(a);
                        li1.setAttribute("class", "menu-item");
                        ul.appendChild(li1)
                    }else{
                        a.setAttribute("class", "menu-link menu-toggle");
                        let li1 = document.createElement('li');
                        li1.appendChild(a);
                        li1.setAttribute("class", "menu-item");
                        addChild(chapter, li1)
                        ul.appendChild(li1)
                    }                    
                }
                li.appendChild(ul)
            }

            for (const chap of partie.children) {
                let a = document.createElement('a');
                a.innerText = chap.nodeName + ' ' + chap.id;
                a.setAttribute("href", "javascript:void(0)");
                if(chap.childElementCount == 0){
                    a.setAttribute("class", "menu-link");
                    let li = document.createElement('li');
                    li.appendChild(a);
                    li.setAttribute("class", "menu-item");
                    
                    ul.appendChild(li);
                }else{
                    a.setAttribute("class", "menu-link menu-toggle");
                    let lil = document.createElement('li');
                    lil.appendChild(a);
                    lil.setAttribute("class", "menu-item");
                    addChild(chap, lil)
                    
                    ul.appendChild(lil);
                }
            }
            
            mainLi.append(main, ul);
            node.append(mainLi);
       });

       
    });
});
