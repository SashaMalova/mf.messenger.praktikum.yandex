const fs = require('fs');
const path = require('path');

function copyFileSync(source, target) {
    let targetFile = target;
    if (fs.existsSync(target)) {
        if (fs.lstatSync(target).isDirectory()) {
            targetFile = path.join(target, path.basename(source));
        }
    }
    fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync(source, target, makedir) {
    let files = [];
    let targetFolder;
    if (makedir) {
        targetFolder = path.join(target, path.basename(source));
    } else {
        targetFolder = path.join(target);
    }
    if (!fs.existsSync(targetFolder)) {
        fs.mkdirSync(targetFolder);
    }
    if (fs.lstatSync(source).isDirectory()) {
        files = fs.readdirSync(source);
        files.forEach(function (file) {
            const curSource = path.join(source, file);
            if (fs.lstatSync(curSource).isDirectory()) {
                copyFolderRecursiveSync(curSource, targetFolder, true);
            } else {
                copyFileSync(curSource, targetFolder);
            }
        });
    }
}

fs.rmdirSync('./build', {recursive: true});
copyFolderRecursiveSync('./static/', './build', false);