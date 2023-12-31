/**
 *
 * we will try to get images of diff dog.
 *
 * and we try to save the image path to a file
 *
 *
 */

// const fs = require("fs");
// const superAgent = require("superagent");
// const fetch = require("node-fetch");

import fetch from "node-fetch";
import fs from "fs";
import superAgent from "superagent";

/**
 *
 * the below code uses callback for superagent  we can use .then() to simplify
 */

fs.readFile("../Public/inputDog.txt", "utf-8", (err, data) => {
    if (err) return console.log("errrrrrr file read", err);
    console.log("input DOg breed", data);
    superAgent
        .get(`https://dog.ceo/api/breed/${data}/images/random`)
        .end((err, res) => {
            fs.writeFile(
                "../Public/outputDogImgPath.txt",
                res.body.message,
                (err) => {
                    if (err) return console.log(err.message);
                    console.log("image path saved to file!");
                }
            );
        });
});

/**
 *
 * in the above code fs takes the callbacks  for handling the data read write operations
 *
 * we can actulally convert them to returning the promises so that we can use .then().catch()
 * methods to simplify the code for readibulity
 *
 *
 *
 */

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

/**
 *
 * here we are using  chaining for for resolving the callbacks
 */

readFilePro("../Public/inputDog.txt")
    .then((data) => {
        console.log(data);
        return superAgent.get(
            `https://dog.ceo/api/breed/${data}/images/random`
        );
    })
    .then((data1) => {
        console.log("data 111---", data1.body.message);
        return writeFilePro("../Public/out.txt", data1.body.message);
    })
    .then(() => console.log("written to file"))
    .catch((err) => console.log(err.message));

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

(async () => {
    try {
        const data = await readFilePro("../Public/inputDog.txt");
        console.log(data);
        const res = await fetch(
            `https://dog.ceo/api/breed/${data}/images/random`
        );
        const message = await res.json();
        console.log(message);
        await writeFilePro("../Public/out.txt", message.message);
    } catch (error) {
        console.log(error);
    }
})();

/**
 *
 * superAgent.get(`https://dog.ceo/api/breed/${data}/images/random`);
 *     |
 *     | ----->  no need to convert to json we get the imgPath in data.body.image
 *
 * in below code there is no need to actually wait to fetch img
 *
 * below code shows how to actually use promise.all
 *
 */

(async () => {
    try {
        const data = await readFilePro("../Public/inputDog.txt");
        const img1 = fetch(
            `https://dog.ceo/api/breed/${data}/images/random`
        ).then((r) => r.json());
        const img2 = fetch(
            `https://dog.ceo/api/breed/${data}/images/random`
        ).then((r) => r.json());
        const img3 = fetch(
            `https://dog.ceo/api/breed/${data}/images/random`
        ).then((r) => r.json());

        const all = await Promise.all([img1, img2, img3]);
        const images = all.map((el) => el.message);
        console.log(images);
        await writeFilePro("../Public/out.txt", images.join("\n"));
    } catch (error) {
        console.log(error);
    }
})();
