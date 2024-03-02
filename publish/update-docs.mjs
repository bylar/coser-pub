import { execSync } from "child_process";
import { copyFileSync, rmSync } from "fs";
import fs from 'fs';
import path from 'path';
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
fs.existsSync(path.resolve('.', './docs')) && rmSync(path.resolve('.', './docs'), { recursive: true, force: true });
fs.mkdirSync(path.resolve('.', './docs'));
let files = getAllFiles('./dist');
Promise.all(files.map(async p => {
  fs.mkdirSync(path.dirname(p.replace('dist', 'docs')), { recursive: true });
  copyFileSync(p, p.replace('dist', 'docs'));
  console.log("SyncCos:ok ", p.replace('dist', 'docs'));
  return true;
})).then(reses => console.log("CosSync:finished!", `${reses.filter(e => e).length}/${files.length}`));
execSync('git add ./docs');
