const { execFile } = require('child_process');

const child = execFile('node', ['--version'], (error, stdout, stderr) => {
  if (error) {
    throw error;
  }
  console.log(stdout);
});

const child2 = execFile('./output.out', ['file1.txt', 'file2.txt'], (error, stdout, stderr) => {
    if (error) {
      throw error;
    }
    console.log(stdout);
});

