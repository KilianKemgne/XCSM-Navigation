Neutralino.init();
let search = document.getElementById("search-notion")
let arbo = document.querySelectorAll('arbo')
let nodes = document.getElementById('node');

function displaySearchNotions(Position) {
    arbo.forEach(arb => {
        arb.remove()
    })
    fetch('../descriptionNotions.xml').then((response) => {
        response.text().then((xml) => {
            let xmlContent = xml;
            let parser = new DOMParser();
            let xmlDOM = parser.parseFromString(xmlContent, 'application/xml')
            let notions = xmlDOM.querySelectorAll('notion');
            
            notions.forEach((notion) => {
                fetch('../'+notion.id+'.xml').then((response) => {
                    response.text().then((xml) => {
                        let xmlContent1 = xml;
                        let parser1 = new DOMParser();
                        let xmlDOM1 = parser1.parseFromString(xmlContent1, 'application/xml');
                        let root = xmlDOM1.querySelector('notion');
                        let value = search.value;
                        if(root.textContent.toString().includes(value)){
                            let mainLi = document.createElement('li');
                            mainLi.setAttribute("class", "menu-item");
            
                            let a = document.createElement('a');
                            let titre = xmlDOM1.querySelector('titre')
                            a.innerText = titre.textContent;
                            
                            a.setAttribute("href", "javascript:void(0)");
                            
                            a.setAttribute("class", "menu-link");
                            let li = document.createElement('li');
                            li.appendChild(a);
                            li.setAttribute("class", "menu-item");
                            mainLi.setAttribute("position", notion.id)
                            mainLi.setAttribute("onClick", "displayNotions("+notion.id+")");
                                                                
                            mainLi.append(li);
                            mainLi.setAttribute("id", "arbo");
                            nodes.append(mainLi);
                        } 
                    })
                }) 
            });
        })        
    }) 
}