const fs = require("fs");
const filePath = "t:\\aaa\\a.txt"
try {
    let file = fs.openSync(filePath, "wx");
    fs.closeSync(file);
} catch (error) {
    console.error(error);
    // console.error(error.message);
}
console.log("END");