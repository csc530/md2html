(() => {
    const fs = require("fs"); /*TODO: make a module to more concisely get stdin values*/
    const args = process.argv.splice(2);
    console.log(args);
    if (args.length === 0) {
        console.log("Please enter the file or directory of markdown files to convert");
        console.log("(only .md files will be processed).\n");
        let path= null;
        process.stdin.on("data", (data) => {
            try {
                const filetype = fs.lstatSync(data.toString().trim());
                console.dir(filetype);
                console.log(data);
                if (filetype.isDirectory() || filetype.isFile())
                    return convert(Object.assign(filetype, { string: data.toString().trim() }));
            }
            catch (error) { console.error(error); }
        });
    }

    function convert(path) {
        if (path.isDirectory()) {
            const dir = fs.opendirSync(path.string);
            let file = dir.readSync();
            while (file) {
                console.dir(file);
                if (file.isFile() && file.name.endsWith(".md"))
                    compile(file);
                file = dir.readSync();
            }
        }
        else if (path.isFile()) {
            const file = fs.readFileSync(path.string, { encoding: "utf-8" });
            compile(file);
        }
    }

    function compile(file) {
        const tokens = tokenize(file);
        const ast = parse(tokens);
        const html = compile(ast);
        return html;

        function tokenize(file) { }

        function parse(tokens) { }

        function compile(ast) { }
    }
})();