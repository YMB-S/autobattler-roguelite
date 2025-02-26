const fs = require('fs');
const path = require('path');

const assetsDir = 'public/assets';
const outputFile = 'public/assets/all_sprites_filenames.json';

interface ImageList {
    [key: string]: string;
}

function getFiles(dir: string, basePath = ''): ImageList {
    let filesList: ImageList = {};

    fs.readdirSync(dir).forEach((file: string) => {
        const fullPath = path.join(dir, file);
        const relativePath: string = path.join(basePath, file);

        if (fs.statSync(fullPath).isDirectory()) {
            Object.assign(filesList, getFiles(fullPath, relativePath));
        } else {
            const extension = path.extname(file);
            if (extension == ".png") {
                //const key = path.basename(file, extension);

                let pathComponents = relativePath.split("\\");
                delete pathComponents[pathComponents.indexOf("sprites")];
                let itemPrefix = "";
                pathComponents.forEach(element => {
                    itemPrefix += "_" + element;
                });
                let itemName = itemPrefix.slice(1);
                const key = path.basename(itemName, extension);       
                filesList[key] = relativePath.replace(/\\/g, '/');
            }
        }
    });

    return filesList;
}

const assets = getFiles(assetsDir);
fs.writeFileSync(outputFile, JSON.stringify(assets, null, 2));

console.log('✅ Image asset list generated:', outputFile);
