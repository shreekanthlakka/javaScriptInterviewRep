/**
 *
 * we will try to get images of diff dog.
 *
 * and we try to save the image path to a file
 *
 *
 */

const fs = require("fs");
const superAgent = require("superagent");

/**
 *
 * the below code uses callback for superagent  we can use .then() to simplify
 */

// fs.readFile("../Public/inputDog.txt", "utf-8", (err, data) => {
//     if (err) return console.log("errrrrrr file read", err);
//     console.log("input DOg breed", data);
//     superAgent
//         .get(`https://dog.ceo/api/breed/${data}/images/random`)
//         .end((err, res) => {
//             fs.writeFile(
//                 "../Public/outputDogImgPath.txt",
//                 res.body.message,
//                 (err) => {
//                     if (err) return console.log(err.message);
//                     console.log("image path saved to file!");
//                 }
//             );
//         });
// });

const readFilePro = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, "utf-8", (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
};

const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, (err) => {
            if (err) return reject(err);
            resolve("sucess");
        });
    });
};

(async () => {
    const data = await readFilePro("../Public/inputDog.txt");
    console.log(data);
    const res = await fetch(`https://dog.ceo/api/breed/${data}/images/random`);
    console.log(res.body.message);
    await writeFilePro("../Public/out.txt", res);
})();

// readFilePro("../Public/inputDog.txt")
//     .then((data) => {
//         console.log(data);
//         return superAgent.get(
//             `https://dog.ceo/api/breed/${data}/images/random`
//         );
//     })
//     .then((data1) => {
//         console.log("data 111---", data1.body.message);
//         return writeFilePro("../Public/out.txt", data1.body.message);
//     })
//     .then(() => console.log("written to file"))
//     .catch((err) => console.log(err.message));

// fs.readFile("../Public/inputDog.txt", "utf-8", (err, data) => {
//     if (err) return console.log("errrrrrr file read", err);
//     console.log(data);
//     superAgent
//         .get(`https://dog.ceo/api/breed/${data.trim()}/images/random`)
//         .then((responce) => {
//             console.log("responce od superagent", responce.body.message);
//              fs.writeFile(
//                 "../Public/outputDogImgPath.txt",
//                 res.body.message,
//                 (err) => {
//                     if (err) return console.log(err.message);
//                     console.log("image path saved to file!");
//                 }
//             );
//         })
//         .catch((err) => console.log(err.message));
// });
