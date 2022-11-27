// let textContent = document.getElementById('text-content');

// $(document).ready(function getClickedElement()
// {
    
//     //we get the element target
//     $('#arbo').click(function(e){
//         var el= e.target||event.srcElement;
//                 alert (event.srcElement);
//                 alert("je suis cliqué");
//     });
// });


function displayNotions(text) {
    Position = text.split(' ')[1];
    fetch('../descriptionNotions.xml').then((response) => {
        response.text().then((xml) => {
            let xmlContent = xml;
            let parser = new DOMParser();
            let xmlDOM = parser.parseFromString(xmlContent, 'application/xml')
            let notions = xmlDOM.querySelectorAll('notion');

            notions.forEach((notion) => {
                if(notion.position == Position){
                    alert(notion.id)
                } else {
                    alert(notion.id+'   '+Position+"   failed")
                }

            });
        })
        
    })

}