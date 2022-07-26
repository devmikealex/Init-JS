const fs = require("fs");
const path = require("path");
const prompt = require("prompt-sync")();
const clc = require("cli-color");

// console.log("__dirname = " + __dirname);
console.log("==============================");
console.log(clc.cyanBright('Initializing a new JS project'));
console.log();
console.log(clc.yellow("CURRENT DIR: ") + process.cwd());
console.log();

createHTMLFile("index.html");
createFile("index.js");
createFile("style.css");
createFile("README.md");

try {
    const gitignoreFile = path.join(__dirname, "template.gitignore")
    const gitignoreNewFile = path.join(process.cwd(), ".gitignore")
    fs.copyFileSync(gitignoreFile, gitignoreNewFile)
    console.log(clc.yellow("New File: ") + gitignoreNewFile);
} catch (error) {
    console.error(clc.red(error.message));
}
console.log("END");

function createHTMLFile(newFile) {
    const filePath = path.join(process.cwd(), newFile);
    const fileTemplatePath = path.join(__dirname, "htmlTemplate.html");
    console.log(clc.yellow("New File: ") + filePath);
    console.log(clc.yellow("Template File: ") + fileTemplatePath);
    try {
        let file = fs.openSync(filePath, "wx");
        console.log(clc.green(`File ${newFile} CREATED = ${file}`));
        let fileTemplate = fs.openSync(fileTemplatePath, "r");
        console.log(
            clc.green(`File htmlTemplate.html CREATED = ${fileTemplate}`)
        );

        let newHTML = fs.readFileSync(fileTemplate, { encoding: "utf8" });
        let newTitle = prompt(
            "HTML Title? " + clc.red("(CTRL+C to abort)") + " > "
        );
        if (newTitle) {
            // newHTML = newHTML.replace("x-Document-x", newTitle);
        } else {
            const dirName = path.basename(process.cwd());
            console.log(clc.yellow("Use default title ")+dirName);
            newTitle = dirName;
        }
        newHTML = newHTML.replace("x-Document-x", newTitle);

        console.log();
        console.log(clc.magenta(newHTML));
        fs.writeFileSync(file, newHTML);

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

require("readline")
    .createInterface(process.stdin, process.stdout)
    .question("Press any key to exit...", function () {
        process.exit();
    });