const { execFile } = require('child_process');
const path = require('path')
var fs = require('fs');

var util = require('util');
var express = require('express');
var app =  express()

module.exports = async (req, res) => {
    global.file1 = req.files.file1;
    //app.locals.file1 = file1;
    await file1.mv(path.resolve(__dirname, '../uploads', file1.name))

    global.file2 = req.files.file2;
    //app.locals.file2 = file2;
    await file2.mv(path.resolve(__dirname, '../uploads', file2.name))

    const child = execFile('/home/devdan/SMTPlan/SMTPlan/build/SMTPlan', ['./uploads/'+file1.name, './uploads/'+file2.name], (error, stdout, stderr) => {
        if (error) {
        throw error;
        }
        //var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});

        //var log_stdout = stdout;
        const myConsole = new console.Console(fs.createWriteStream('./output.txt'));
        myConsole.log(stdout);
        // TODO:call some string process to remove whitespace 
        //console.log(typeof stdout);
        console.log(stdout);
        /*console.log = function(d) { //
            log_file.write(util.format(d) + '\n');
            log_stdout.write(util.format(d) + '\n');
        };*/

        //to change the file run the python code
       const python = execFile('python3',['emptyline.py',],(error, stdout, stderror)=>{
        if(error){
            throw error
        }
        else{
            //console.log(stdout);
            //res.send(stdout);
            var data = fs.readFileSync('output.txt', 'utf8')
        //console.log(data);
         res.render('submitted',{data})
        }
        
    })
        //res.render('submitted',{stdout});
        
    });
}

