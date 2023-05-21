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
    global.planner = req.body.planner;
    console.log(req.body);
    //req.body.planner ==smtplan else enhsp
    //var enhsp = "'/usr/local/bin/ENHSP-Public/enhsp'"
    //var enhsp_arg = "'-o', './uploads/'+file1.name, '-f', './uploads/'+file2.name"
         if(req.body.planner == "smtplan"){
        //const child = execFile('/usr/local/bin/ENHSP-Public/enhsp',['-o', './uploads/'+file1.name, '-f', './uploads/'+file2.name],(error,stdout,stderr)=>{
    const  child = execFile('/usr/local/bin/SMTPlan/SMTPlan/build/SMTPlan', ['./uploads/'+file1.name, './uploads/'+file2.name], (error, stdout, stderr) => {
        if (error) {
        throw error;
        }
        
        //var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});

        //var log_stdout = stdout;
        const myConsole = new console.Console(fs.createWriteStream('extras/output.txt'));
        myConsole.log(stdout);
        // TODO:call some string process to remove whitespace 
        //console.log(typeof stdout);
        console.log(stdout);
        /*console.log = function(d) { //
            log_file.write(util.format(d) + '\n');
            log_stdout.write(util.format(d) + '\n');
        };*/

        //to change the file run the python code
       const python = execFile('python3',['extras/emptyline.py',],(error, stdout, stderror)=>{
        if(error){
            throw error
        }
        else{
            //console.log(stdout);
            //res.send(stdout);
            global.data = fs.readFileSync('extras/output.txt', 'utf8')
        //console.log(data);
         res.render('submitted',{data:data, planner: req.body.planner})
        }
        
    })
        //res.render('submitted',{stdout});
        
    });
    }
    if(req.body.planner == "enhsp"){
           const child = execFile('/usr/local/bin/ENHSP-Public/enhsp',['-o', './uploads/'+file1.name, '-f', './uploads/'+file2.name],(error,stdout,stderr)=>{
    //const child = execFile('/usr/local/bin/SMTPlan/SMTPlan/build/SMTPlan', ['./uploads/'+file1.name, './uploads/'+file2.name], (error, stdout, stderr) => {
        if (error) {
        throw error;
        }
        //var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});

        //var log_stdout = stdout;
        const myConsole = new console.Console(fs.createWriteStream('extras/output.txt'));
        myConsole.log(stdout);
        // TODO:call some string process to remove whitespace 
        //console.log(typeof stdout);
        console.log(stdout);
        /*console.log = function(d) { //
            log_file.write(util.format(d) + '\n');
            log_stdout.write(util.format(d) + '\n');
        };*/

        //to change the file run the python code
       const python = execFile('python3',['extras/emptyline.py',],(error, stdout, stderror)=>{
        if(error){
            throw error
        }
        else{
            //console.log(stdout);
            //res.send(stdout);
            global.data = fs.readFileSync('extras/output.txt', 'utf8')
        //console.log(data);
         res.render('submitted',{data:data, planner: req.body.planner})
        }
        
    })
        //res.render('submitted',{stdout});
        
    });
    }
 
}

