import fetch from "node-fetch";
import fs from "fs";

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
    const message = await res.json();
    console.log(message);
    await writeFilePro("../Public/out.txt", message);
})();
