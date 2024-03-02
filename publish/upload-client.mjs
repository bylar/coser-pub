import { config } from "./config.mjs";
import fs from 'fs';
import CosNode from 'cos-nodejs-sdk-v5';
import path from 'path';
const syncRoot = `/`;
const destRoot = './dist';
/**
 * getAllFiles - 获取目录下所有文件
 * @param {string} root
 * @returns {Array<string>}
 */
function getAllFiles(root) {
  let paths = [];
  let files = fs.readdirSync(root);
  files.map(item => fs.statSync(path.resolve(root, item)).isDirectory() ? paths = [...paths, ...(getAllFiles(path.resolve(root, item)))] : paths.push(path.resolve(root, item)));
  return paths;
}

if (!config.Bucket || !config.Region || !config.SecretId || !config.SecretKey) console.log("Config didn't completely");
else {
  const cos = new CosNode(config), dest = path.resolve('.', destRoot);
  let files = getAllFiles(dest);
  Promise.all(files.map(async path => {
    let Key = syncRoot + path.replace(dest, "").replace(/\\/g, "/").slice(1), Body = fs.createReadStream(path);
    let result = await new Promise(complete => cos.putObject({ ...config, Key, Body }, (err, data) => complete({ err, data })));
    result.err ? console.warn("SyncCos:fail ", path, result.err) : console.log("SyncCos:ok ", path);
    return !(result.err);
  })).then(reses => console.log("CosSync:finished!", `${reses.filter(e => e).length}/${files.length}`));
}
