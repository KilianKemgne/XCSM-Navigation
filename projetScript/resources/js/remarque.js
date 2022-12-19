Neutralino.init();
let nameWithTitle = document.getElementById('nameWithTitle');
let saveRemarque = document.getElementById('saveRemarque');
let remarque = {};
let showRemarque = document.getElementById('showRemarque')
let getRemarque = document.getElementById('getRemarque')
let largeModal_content = document.getElementById('largeModal-content')

saveRemarque.addEventListener('click', () => {
    console.log(nameWithTitle.value);
    if(remarque[localStorage.getItem('currentNotion')] == undefined){
        remarque[localStorage.getItem('currentNotion')] = {};
    }
    let date = new Date(Date.now())
    remarque[localStorage.getItem('currentNotion')][date.toUTCString()] = nameWithTitle.value
    Neutralino.filesystem.writeFile('./resources/remarques.json', JSON.stringify(remarque));
})

showRemarque.addEventListener('click', () => {
    fetch('../remarques.json').then((response) => {
        response.text().then((json) => {
            let jsonContent = json;
            let content = JSON.parse(jsonContent);
            for (const data of Array.from(Object.keys(content))) {
                
                if(data == localStorage.getItem('currentNotion')){
                    
                    for (const intern of Array.from(Object.keys(content[data]))) {
                        let row = document.createElement('div');
                        row.setAttribute('class', 'row')
                        let bs_toast = document.createElement('div')
                        bs_toast.setAttribute('class', 'bs-toast toast fade show col mx-3 mb-2')
                        bs_toast.setAttribute('role', 'alert')
                        bs_toast.setAttribute('aria-live', 'assertive')
                        bs_toast.setAttribute('aria-atomic', 'true')
                        
                        let toast_header = document.createElement('div')
                        toast_header.setAttribute('class', 'toast-header')
    
                        let me_auto = document.createElement('div')
                        me_auto.setAttribute('class', 'me-auto fw-semibold')
                        me_auto.innerText = localStorage.getItem('currentNotion');
    
                        let small = document.createElement('small');
                        let formatDate = new Date(intern);
                        small.innerText = formatDate.toLocaleDateString();
    
                        toast_header.append(me_auto, small);
    
                        let toast_body = document.createElement('div');
                        toast_body.setAttribute('class','toast-body');
                        toast_body.innerText = content[data][intern]
                        
                        bs_toast.append(toast_header, toast_body)
                        row.appendChild(bs_toast);
                        getRemarque.appendChild(row);
                    }
                }
            }
        })
    })
})  

