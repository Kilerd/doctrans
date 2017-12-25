import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

export const resolvePath = (...dir) => {
  return path.resolve(process.cwd(), ...dir)
}

export const read = async (file) => {
  let err, data = await readFile(resolvePath(file));
  if (err) {
    if (err.code === 'ENOENT') {
      console.error('doctrans config file does not exist');
      console.error('please use doctrans init to initial a doctrans project');
      return;
    }
  }
  return JSON.parse(data);
}

export const write = async (file, data) => {
  let err = await writeFile(resolvePath(file), JSON.stringify(data, null, 2));
  if (err) throw err;
}

export const changeConfig = async (config) => {
  await write(resolvePath('./.doctrans.json'), config);
}