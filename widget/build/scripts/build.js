const fs = require("fs")
config = require(__dirname + "/../../build.config.js");

// console.log(config)


for (i of config.sections) {
    merge_section(i);
}
//
// module.exports = {
//     sections: [
//         {
//             outpath: "./build/button.js",
//             main_path: "./src/button/button.js",
//             inputs: [
//                 {
//                     source: "./src/button/index.html",
//                     var_name: "popup"
//                 },
//                 {
//                     source: "./src/button/style.css",
//                     var_name: "popupStyle"
//                 },
//             ],
//         },
//     ]
//
// };



async function merge_section(section) {
    let mainFileContent = await read_file(section.main_path) 
    for (i of section.inputs) {
        console.log("i = ", i)
        mainFileContent = `const ${i.var_name} = \`` + await read_file(i.source) + "`;\n" + mainFileContent;
    }
    // console.log(mainFileContent)
    write_file(section.outpath, mainFileContent);
}

async function read_file(path) {
    return fs.readFileSync(path).toString();
}
async function write_file(path, data) {
    return fs.writeFileSync(path, data);
}
