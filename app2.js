// const fs = require("fs");

// let readableStream = fs.createReadStream("./info2.txt");
// fs.mkdirSync("./data");
// let writableStream = fs.createWriteStream("./data/info3.txt");

// readableStream.pipe(writableStream);
const message = require("./apptry");

console.log(message.greet("Juan Dela Cruz","Good morning"));