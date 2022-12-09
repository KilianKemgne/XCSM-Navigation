
let courseName = document.getElementById('course-name');
let node = document.getElementById('node');

fetch('../description.xml').then((response) => {
    response.text().then((xml) =>{
        let xmlContent = xml;
        let parser = new DOMParser();
        let xmlDOM = parser.parseFromString(xmlContent, 'application/xml');
        let parties = xmlDOM.querySelectorAll('partie')
        let default_name = 'Nom par defaut'
        if(xmlDOM.querySelector('cours').hasAttribute('titre') && (xmlDOM.querySelector('cours').getAttribute('titre') !== '') ){
            courseName.innerText = 'Cours : '+xmlDOM.querySelector('cours').getAttribute('titre');
        } else {
            courseName.innerText = 'Cours : '+default_name;
        }  
        parties.forEach((partie) => {
            var chemin = '';
            let mainLi = document.createElement('li');
            mainLi.setAttribute("class", "menu-item");

            let main = document.createElement('a');
            main.innerText = partie.nodeName + ' ' + partie.id;
            main.setAttribute("class", "menu-link menu-toggle");
            main.setAttribute("style", "cursor: pointer;");
            chemin = main.innerText;
            
            let ul = document.createElement('ul');
            ul.setAttribute("class", "menu-sub");

            function addChild(chap, li) {
                let ul = document.createElement('ul');
                    ul.setAttribute("class", "menu-sub ms-4"); 
                for (const chapter of chap.children) {
                    let nchemin = '';
                    let a = document.createElement('a');
                    // let icon = document.createElement("i");
                    // if(chapter.nodeName == 'paragraphe'){
                    //     icon.setAttribute('class','bx bxl-jquery');
                    // }
                    // let div = document.createElement("div");
                    // div.setAttribute('class','ms-2');
                    a.innerText = chapter.nodeName + ' ' + chapter.id;
                    nchemin += a.innerText;
                    // a.appendChild(icon);
                    // a.appendChild(div)
                    if(chapter.childElementCount == 0){
                        a.setAttribute("class", "menu-link");
                        a.setAttribute("style", "cursor: pointer;");
                        let li1 = document.createElement('li');
                        li1.appendChild(a);
                        li1.setAttribute("class", "menu-item");
                        li1.setAttribute("position", chapter.getAttribute('position'))
                        li1.setAttribute("onClick", "displayNotions("+chapter.getAttribute('position')+")");
                        li1.setAttribute("chemin", chemin+' '+nchemin)
                        ul.appendChild(li1)
                    }else{
                        a.setAttribute("class", "menu-link menu-toggle");
                        a.setAttribute("style", "cursor: pointer;");
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
                chemin += a.innerText;
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
                    addChild(chap, lil, chemin)
                    
                    ul.appendChild(lil);
                }
            }
            
            mainLi.append(main, ul);
            mainLi.setAttribute("id", "arbo");
            node.append(mainLi);
       });

       
    });
});

