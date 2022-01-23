const fs = require('fs');
const PATH = './testFiles/bigFile.txt';

const createBigFile = () => {
  for (let i = 0; i < 1000000; i++) {
    console.log('i', i);
    fs.writeFileSync(PATH, `Something about anything #i \n`, { flag: 'a' });
  }
  console.log('Big file created');
};

createBigFile();
