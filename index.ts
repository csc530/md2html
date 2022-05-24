(() => {
    const fs = require('fs')
    const args = process.argv.splice(2);
    const path = args[0];
    if (typeof path !== 'string')
        return console.error("Invalid path");
    const fileType = fs.lstatSync(path);
    if (fileType.isDirectory()) {
        const dir = fs.opendirSync(path);
        console.dir(dir);
    }
    else if (fileType.isFile()) {
        const file = fs.openSync(path)
    }
})();