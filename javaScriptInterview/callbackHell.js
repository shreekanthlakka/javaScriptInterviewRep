/**
 *
 * the below code is an example of callback hell--in which the code grows horizantally
 */

const fs = require("fs");

fs.readFile("../Public/start.txt", "utf-8", (err, data) => {
    fs.readFile(`../Public/sec.txt`, "utf-8", (err, data1) => {
        fs.readFile("../Public/third.txt", "utf-8", (err, data2) => {
            fs.writeFile(
                "../Public/output.txt",
                `data--${data} data1--${data1} data2--${data2}`,
                "utf-8",
                (err) => {
                    if (err) throw err;
                    console.log(data + "\n" + data1 + "\n" + data2); // Concatenating the three files and printing
                }
            );
        });
    });
});
