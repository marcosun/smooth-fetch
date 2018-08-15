/* eslint-disable */
import path from 'path';
import fse from 'fs-extra';

async function copyFile(file) {
  let buildPath;

  buildPath = path.resolve(__dirname, '../build/', path.basename(file));

  console.log(`Copying ${file} to ${buildPath}`);

  try {
    await fse.copy(file, buildPath);
    console.log(`${file} OK!`);
  } catch(e) {
    console.error(`${file} FAILED!!!`);
  }
}

async function createPackageFile() {
  const packageData = await fse.readFile(path.resolve(__dirname, '../package.json'), 'utf8');
  const {scripts, devDependencies, jest, ...packageDataOther } = JSON.parse(
    packageData,
  );

  const newPackageData = {
    ...packageDataOther,
    main: './index.js',
    module: './index.es.js',
  };

  let buildPath

  buildPath = path.resolve(__dirname, '../build/package.json');

  await fse.writeFile(buildPath, JSON.stringify(newPackageData, null, 2), 'utf8');

  return newPackageData;
}

async function run() {
  await ['README.md', 'LICENSE'].map(file => copyFile(file));

  await createPackageFile();
}

run();
