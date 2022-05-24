(() => {
    const fs = require('fs')
    const stdin = process.stdin; 
    const args = process.argv.splice(2);
    console.log(args);
    if(args.length === 0)
    {
        // Todo: setup prompt for file/dir
        console.log("Please enter the file or directory of markdown files to convert");
        console.log("(only .md files will be processed).\n");
        //todo: prompt in a while to make sure it's correct
    }
    const path = args[0];
    if (typeof path !== 'string')
        return console.error(`Invalid path: ${path}`);
    const fileType = fs.lstatSync(path);
    if (fileType.isDirectory()) {
        const dir = fs.opendirSync(path);
        let file =dir.readSync();
        while(file){
            convert(fs.readFileSync(`${dir.path}/${file.name}`));
        }
    }
    else if (fileType.isFile()) {
        const file = fs.readFileSync(path,{encoding: 'utf-8'});
        convert(file);
    }

    function convert(file){
        const tokens = tokenize(file);
        const ast = parse(tokens);
        const html = compile(ast);
        return html;

        function tokenize(file){}
        function parse(tokens){}
        function compile(ast){}

    }
})();