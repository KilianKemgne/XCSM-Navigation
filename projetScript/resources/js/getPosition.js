Neutralino.init();

function getPosition(number) {
    fetch('../descriptionNotions.xml').then((response) => {
        response.text().then((xml) => {
            let xmlContent = xml;
            let parser = new DOMParser();
            let xmlDOM = parser.parseFromString(xmlContent, 'application/xml')
            let notions = xmlDOM.querySelectorAll('notion');
            alert(notions[number-1].getAttribute('id'))
        })
    })
}
