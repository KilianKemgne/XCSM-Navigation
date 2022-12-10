const fs = require('fs')

export function loadJSON(filename = '') {
    return JSON.parse(
        fs.existsSync(filename)
        ? fs.readFileSync(filename).toString()
        : '""'
    )
}

export function saveJSON(filename = '', json = '""') {
    return fs.writeFileSync(filename, 
        JSON.stringify(
            json, 
            null,
            2
        )
    )
}