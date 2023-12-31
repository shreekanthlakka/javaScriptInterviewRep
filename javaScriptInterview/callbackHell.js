/**
 *
 * the below code is an example of callback hell--in which the code grows horizantally
 * 
 * async1(function (input, result1) {
    async2(function (result2) {
    async3(function (result3) {
      async4(function (result4) {
        async5(function (output) {
          // do something with output
        });
      });
    });
  });
});
 * 
 * 
 */

const fs = require("fs");

fs.readFile("../Public/start.txt", "utf-8", (err, data) => {
    fs.readFile("../Public/sec.txt", "utf-8", (err, data1) => {
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

/**
 *
 * we can avoid the above code callback hell using Promises and async/await
 *
 * below we can solve the proble using async/await
 *
 * we are
 */

(async () => {
    try {
        const data = await fs.promises.readFile("../Public/start.txt", "utf-8");
        const data1 = await fs.promises.readFile("../Public/sec.txt", "utf-8");
        const data2 = await fs.promises.readFile(
            "../Public/third.txt",
            "utf-8"
        );
        fs.writeFile(
            "../Public/output1.txt",
            `${data} --- ${data1} ---${data2}`
        );
    } catch (err) {
        console.log(err);
    }
})();

/**
 *
 * we can also promisify the readFile insted of using fs.promises.readFile
 *
 * we can create a readFilePro which returns the promise
 *
 * below we actually taking a file as argument to readFilePro and we are returning the peomise with
 * resolve and reject objects
 * in that block of coad we do the usual fs.fileRead with (err,data) objects as callback
 * so if we get err we perform reject
 *
 */

const readFilePro = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, "utf-8", (err, data) => {
            if (err) reject("no file");
            resolve(data);
        });
    });
};

const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, (err) => {
            if (err) reject(" error");
            else resolve("done");
        });
    });
};

/**
 * we can use the above promisified code in async/await methods
 */

(async () => {
    try {
        const data = await readFilePro("../Public/start.txt");
        const data1 = await readFilePro("../Public/sec.txt");
        const data2 = await readFilePro("../Public/third.txt");
        writeFilePro(
            "../Public/output1.txt",
            `${data} --- ${data1} ---${data2}`
        );
    } catch (err) {
        console.log(err);
    }
})();
