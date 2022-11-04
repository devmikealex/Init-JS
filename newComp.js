const fs = require("fs");
const path = require("path");
const prompt = require("prompt-sync")();
const clc = require("cli-color");

console.log("==============================");
console.log(clc.cyanBright('Initializing a new React Component'));
console.log();
console.log(clc.yellow("CURRENT DIR: ") + process.cwd());
console.log();

let newCompName = prompt(
    "New React Component Name " + clc.red("(CTRL+C to abort)") + " > "
);
if (!newCompName) {
    console.log('Use default name DEF');
    newCompName = 'DEF'
}

createJSReactCompFile( newCompName + '.js')
createFile( newCompName + '.css');

function createJSReactCompFile(newFile) {
    const filePath = path.join(process.cwd(), newFile);
    const fileTemplatePath = path.join(__dirname, "jsReactCompTemplate.js");
    console.log(clc.yellow("New File: ") + filePath);
    console.log(clc.yellow("Template File: ") + fileTemplatePath);
    try {
        let file = fs.openSync(filePath, "wx");
        console.log(clc.green(`File ${newFile} CREATED = ${file}`));
        let fileTemplate = fs.openSync(fileTemplatePath, "r");
        console.log(
            clc.green(`File htmlTemplate.html opened = ${fileTemplate}`)
        );

        let newComp = fs.readFileSync(fileTemplate, { encoding: "utf8" });
        // let newCompName = prompt(
        //     "New Comp Name? " + clc.red("(CTRL+C to abort)") + " > "
        // );
        if (newCompName) {
            // newHTML = newHTML.replace("x-Document-x", newCompName);
        } else {
            const dirName = path.basename(process.cwd());
            console.log(clc.yellow("Use default title ")+dirName);
            newCompName = dirName;
        }
        newComp = newComp.replaceAll("%%%", newCompName);

        console.log();
        console.log(clc.magentaBright(newComp));
        fs.writeFileSync(file, newComp);

        fs.closeSync(file);
        fs.closeSync(fileTemplate);
    } catch (error) {
        console.error(clc.red(error.message));
    }
    console.log();
}

function createFile(newFile) {
    const filePath = path.join(process.cwd(), newFile);
    console.log(clc.yellow("New File: ") + filePath);
    try {
        let file = fs.openSync(filePath, "wx");
        console.log(clc.green(`File ${newFile} CREATED = ${file}`));
        fs.closeSync(file);
    } catch (error) {
        console.error(clc.red(error.message));
    }
    console.log();
}