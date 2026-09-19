console.log(process.argv);
console.log(process.argv.slice(2));


console.log(Buffer.from("مرحبا").length);
console.log(Buffer.from("hello").length);
console.log("مرحبا".length);


const buf = Buffer.from("Node.js");
console.log(buf.toString("hex"));
console.log(buf.toString("base64"));
