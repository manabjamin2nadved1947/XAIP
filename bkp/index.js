const { execFile } = require('node:child_process');
var fs = require('fs');

const child = execFile('node', ['--version'], (error, stdout, stderr) => {
  if (error) {
    throw error;
  }
  console.log(stdout);
});

const child2 = execFile('./program.out', ['file1.txt', 'file2.txt'], (error, stdout, stderr) => {
    if (error) {
      throw error;
    console.log(stdout);
    fs.readFile('file3.txt', 'utf8', function(err, data) {
      console.log(data)
    })
});

