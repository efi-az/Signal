import * as fs from 'fs';
import { promisify } from 'util';

export const checkIfFileOrDirectoryExists = (path: string): boolean => {
  return fs.existsSync(path);
};

export const getFile = (path: string) => {
  let filename = [];
  fs.readdirSync(path).forEach(file => {
    const lanName = file.split('-')[1].split('.')[0];
    const jsonData = require(path + '/error-' + lanName + '.json');
    filename.push({
      filename: lanName,
      value: jsonData,
    });
  });

  return filename;
};

export const createFile = async (path: string, fileName: string, data: any): Promise<void> => {
  if (!checkIfFileOrDirectoryExists(path)) {
    fs.mkdirSync(path);
  }

  const writeFile = promisify(fs.writeFile);

  return await writeFile(`${path}/${fileName}`, JSON.stringify(data), 'utf8');
};

export const writeJsonFile = async (path: string, fileName: string, data: any) => {
  const writeFile = promisify(fs.writeFile);
  await writeFile(`${path}/${fileName}`, JSON.stringify(data), 'utf8');
};

export const deleteFile = async (path: string): Promise<void> => {
  const unlink = promisify(fs.unlink);

  return await unlink(path);
};