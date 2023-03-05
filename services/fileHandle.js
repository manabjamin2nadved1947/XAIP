/*const {PythonShell} = require('python-shell').PythonShell;
const path = require('path')
var fs = require('fs');

module.exports = async (req, res) => {

var util = require('util');
PythonShell.run('./services/tt.py', null, function (err) {
  if (err) throw err;
  console.log('finished');
});

}*/

const express = require('express')
/*const {spawn} = require('child_process');
const app = express()
//const port = 3000
module.exports = async (req, res) => {
 
 var dataToSend;
 // spawn new child process to call the python script
 const python = spawn('python3', ['./file.py','accelerate']);
 // collect data from script
 python.stdout.on('data', function (data) {
  console.log('Pipe data from python script ...');
  dataToSend = data.toString();
 });
 // in close event we are sure that stream from child process is closed
 python.on('close', (code) => {
 console.log(`child process close all stdio with code ${code}`);
 // send data to browser
 //res.setHeader('Content-type','text/html')
 res.render('sub',{dataTosend :dataToSend})
 });
 
}*/

/*
const { execFile } = require('child_process');
const path = require('path')
var fs = require('fs');

var util = require('util');

module.exports = async(req, res) =>{
    const python = execFile('python3',['file.py','accelerate'],(error, stdout, stderror)=>{
        if(error){
            throw error
        }
        else{
            console.log(stdout);
            res.send(stdout);
        }
    })
}
*/

//TASK 2 
// read file and store it as a string
//const Fs = require('@supercharge/filesystem')
const fs = require('fs')
//const matchAll = require("match-all");

module.exports = async(req,res) =>{
    //let content=null;
    const content = fs.readFile("car_domain_nodrag.pddl",'utf8',(err, data)=>{
        if(err){
            console.log(err)
        }
    //find all the first index  of "action"    

    //var str = "...";
    var searchKeyword = ":action ";
    var keyLength = searchKeyword.length;
    var startingIndices = [];

    var indexOccurence = data.indexOf(searchKeyword, 0);

    while(indexOccurence >= 0) {
        startingIndices.push(indexOccurence);

        indexOccurence = data.indexOf(searchKeyword, indexOccurence + 1);
        
    }
        console.log(startingIndices) // of "(:action"

        actionArray=[]
        //replace all new line by white space in data
        data = data.replace(/[\r\n\t]/gm, ' ');
        for(let i=0;i<startingIndices.length;i++){
            let action = data.substring(startingIndices[i]+keyLength, data.indexOf(' ',startingIndices[i]+keyLength))
            actionArray.push(action);
        }

    

        res.send(actionArray)
    });


   
    
} 




