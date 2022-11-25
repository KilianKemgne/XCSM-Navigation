let xmlContent = '';
let NotionList = document.getElementById('desc-notions');
let courseName = document.getElementById('course-name');
fetch('../description.xml').then((response) => {
    response.text().then((xml) =>{
        xmlContent = xml;
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
            let li = document.createElement('li');
   
            li.innerText = partie.children[0].nodeName + ' ' + partie.children[0].id;
            //li.appendChild(li);
   
            NotionList.appendChild(li);
       });
    });
});
