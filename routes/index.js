var express = require('express');
var router = express.Router();
var runCpp = require('../services/runCpp');
var opt_plan = require('../services/opt_plan');
var opt_plan_len = require('../services/opt_plan_len');
const { execFile } = require('child_process');
var util = require('util');
var fs = require('fs')

var app = express()

const session = require('express-session');
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));



app.use(express.urlencoded({ extended: true }));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: `A Contrastive Plan Explanation Framework for Hybrid System Models` });
});

router.post('/submit', runCpp);

router.post('/sub',(req, res,next)=>{
  //console.log(req.body.questions);
  global.actionArray=[]

  //console.log(`inside post ${req.body.questions}`)
  // make a list of actions from the uploaded domain file
    var data = fs.readFileSync('./uploads/'+global.file1.name,'utf8')
      var searchKeyword = ":action "; //":durative-action "
      if(data.search(searchKeyword)!=-1){
        var keyLength = searchKeyword.length;
      var startingIndices = [];

      var indexOccurence = data.indexOf(searchKeyword, 0);
      //if not found then search-for (:durative-action

      while(indexOccurence >= 0) {
        startingIndices.push(indexOccurence);

        indexOccurence = data.indexOf(searchKeyword, indexOccurence + 1);
        
      }
        console.log(startingIndices) // of "(:action"

        
        //replace all new line by white space in data
        data = data.replace(/[\r\n\t]/gm, ' ');
        for(let i=0;i<startingIndices.length;i++){
            let action = data.substring(startingIndices[i]+keyLength, data.indexOf(' ',startingIndices[i]+keyLength))
            actionArray.push(action);
        }

      }
      var searchKeyword2=":durative-action "
      if(data.search(searchKeyword2)!=-1){
        var keyLength = searchKeyword2.length;
      var startingIndices = [];

      var indexOccurence = data.indexOf(searchKeyword2, 0);
      //if not found then search-for (:durative-action

      while(indexOccurence >= 0) {
        startingIndices.push(indexOccurence);

        indexOccurence = data.indexOf(searchKeyword2, indexOccurence + 1);
        
      }
        console.log(startingIndices) // of "(:action"

        
        //replace all new line by white space in data
        data = data.replace(/[\r\n\t]/gm, ' ');
        for(let i=0;i<startingIndices.length;i++){
            let action = data.substring(startingIndices[i]+keyLength, data.indexOf(' ',startingIndices[i]+keyLength))
            actionArray.push(action);
        }

      }
      console.log(actionArray)
      console.log("hooray"+global.planner)
  
  if(req.body.questions=='q1'){
   //do something 
  }
  
  if(req.body.questions=='q4'){}

  if (req.body.questions =='q6'){
     //res.render('sub',{item : req.body.questions,input: req.query, submitted :false});

  }

 res.render('sub',{item : req.body.questions, actionArray: actionArray, input: req.query, submitted :false});
});




router.get('/sub',(req,res,next)=>{
  global.sub_query_qs = req.query.questions
  //req.session.questions = req.query.questions;

  //console.log(req.session.questions)


global.a = true;
  var callback =  (error,stdout,stderror)=>{
    if(error){
        throw error;
      }
      else{
        global.a = true;
        console.log(stdout);

        res.render('sub',{...{item: req.query.questions, stdout: stdout,  ...req.query, submitted: true}}) //spread 
      }
}

  /* question 1*/
  if(req.query.questions == 'q1'){


    if(global.planner=='smtplan'){
      const python = execFile('python3',['contrastive_questions/question1.py',req.query.action1, req.query.instance, req.query.action2,'./uploads/'+global.file1.name,'./uploads/'+global.file2.name],(error, stdout, stderror)=>{
      if (error){
        throw error
      }
      else{
        console.log(stdout);

        global.a = false;
         const smtplan = execFile('/usr/local/bin/SMTPlan/SMTPlan/build/SMTPlan',['modified_planning_problems/modified_q1_domain.pddl', 'modified_planning_problems/modified_q1_problem.pddl'], (error,stdout,stderror)=>{
      if(error){
        throw error;
      }
      else{
        global.a = true;
        console.log(stdout);

        res.render('sub',{...{item: req.query.questions, stdout: stdout, ...req.query, input: req.query, submitted: true}}) //spread 
      }
    })

      }

             const myTimeout = setTimeout(myError, 10000);
      function myError() {
        var msg = "sorry mate! No plan"; 
        if (a== false) {
          res.render('sub',{...{item: req.query.questions, stdout: msg,  ...req.query, submitted: true}}) //spread 

        }
      }
    })
    }
    

    if(global.planner=='enhsp'){
      const python = execFile('python3',['contrastive_questions/question1_enhsp.py',req.query.action1, req.query.instance, req.query.action2,'./uploads/'+global.file1.name,'./uploads/'+global.file2.name],(error, stdout, stderror)=>{
      if (error){
        throw error
      }
      else{
        console.log(stdout);

        global.a = false;
         const enhsp = execFile('/usr/local/bin/ENHSP-Public/enhsp',['-o','modified_planning_problems/modified_q1_domain.pddl','-f', 'modified_planning_problems/modified_q1_problem.pddl'], (error,stdout,stderror)=>{
      if(error){
        throw error;
      }
      else{
        global.a = true;
        console.log(stdout);

        res.render('sub',{...{item: req.query.questions, stdout: stdout,  ...req.query, input: req.query, submitted: true}}) //spread 
      }
    })

      }

             const myTimeout = setTimeout(myError, 10000);
      function myError() {
        var msg = "sorry mate! No plan"; 
        if (a== false) {
          res.render('sub',{...{item: req.query.questions, stdout: msg,  ...req.query, submitted: true}}) //spread 

        }
      }
    })
    }
    



   
  }



 /*question 2*/ 
  if(req.query.questions == 'q2'){
    const python = execFile('python3',['contrastive_questions/question2.py',req.query.action, req.query.time, './uploads/'+global.file1.name],(error, stdout, stderror)=>{
      if (error){
        throw error
      }
      else{
        console.log(`${req.query.action}, ${req.query.time}` )
        console.log(stdout);

        global.a = false;
        if (global.planner == 'enhsp'){
          const enhsp = execFile('/usr/local/bin/ENHSP-Public/enhsp',['-o', 'modified_planning_problems/modified_q2_domain.pddl', '-f', './uploads/'+file2.name], callback)

        }
        if(global.planner =='smtplan'){
        const smtplan = execFile('/usr/local/bin/SMTPlan/SMTPlan/build/SMTPlan',['modified_planning_problems/modified_q2_domain.pddl', './uploads/'+global.file2.name], {timeout:100000 , killSignal: 'SIGSTOP'},callback)

        }
        //const smtplan = execFile('/usr/local/bin/SMTPlan/SMTPlan/build/SMTPlan',['modified_q2_domain.pddl', './uploads/'+global.file2.name], {timeout:100000 , killSignal: 'SIGSTOP'}, (error,stdout,stderror)=>{
      /*if(error){
        throw error;
      }
      else{
        global.a = true;
        console.log(stdout);

        res.render('sub',{...{item: req.query.questions, stdout: stdout,  ...req.query, submitted: true}}) //spread 
      }
    }) */  
      }

      const myTimeout = setTimeout(myError, 10000);
      function myError() {
        var msg = "sorry mate! No plan"; 
        if (a== false) {
          res.render('sub',{...{item: req.query.questions, stdout: msg,  ...req.query, submitted: true}}) //spread 

        }
      }

    })
    
    
  }


 /*question 3*/ 
  if(req.query.questions == 'q3'){
    const python = execFile('python3',['contrastive_questions/question3.py',req.query.action, req.query.time, './uploads/'+global.file1.name,'./uploads/'+global.file2.name],(error, stdout, stderror)=>{
      if (error){
        throw error
      }
      else{
        console.log(stdout);
         global.a = false;
        if(global.planner=='enhsp'){
          const enhsp = execFile('/usr/local/bin/ENHSP-Public/enhsp',['-o', 'modified_planning_problems/modified_q3_domain.pddl', '-f', 'modified_planning_problems/modified_q3_problem.pddl'],callback)

        } 
        if(global.planner =='smtplan'){
          const smtplan = execFile('/usr/local/bin/SMTPlan/SMTPlan/build/SMTPlan',['modified_planning_problems/modified_q3_domain.pddl', 'modified_planning_problems/modified_q3_problem.pddl'], {timeout:12000 , killSignal: 'SIGSTOP'}, callback)

        }
          /*if(error){
            throw error;
          }
          else{
            global.a = true;
            console.log(stdout);

            res.render('sub',{...{item: req.query.questions, stdout: stdout,  ...req.query, submitted: true}}) //spread 
          }
        })*/
      }

      const myTimeout = setTimeout(myError, 1000);
      function myError() {
        var msg = "sorry mate! No plan"; 
        if (a== false) {
          res.render('sub',{...{item: req.query.questions, stdout: msg,  ...req.query, submitted: true}}) //spread 

        }
      }


    })

    
  }

  /*question 4*/

  if (req.query.questions == 'q4'){
    //console.log("\n I will surely solve it\n")
    /*run the python code here to get contrastive plan*/
    const python = execFile('python3',['contrastive_questions/question4.py',req.query.actions, './uploads/'+global.file1.name],(error, stdout, stderror)=>{
        if(error){
            throw error
        }
        else{
          console.log(stdout);
          problem_file = JSON.stringify(global.file2.name);
          problem_file = problem_file.slice(1,-6) 
          //console.log(problem_file)
          global.a = false;

          if(global.planner =='enhsp'){
            const enhsp = execFile('/usr/local/bin/ENHSP-Public/enhsp',['-o', 'modified_planning_problems/modified_q4_domain', '-f', '.uploads/'+global.file2.name],callback)

          }
          if(global.planner =='smtplan'){
            const smtplan = execFile('/usr/local/bin/SMTPlan/SMTPlan/build/SMTPlan',['modified_planning_problems/modified_q4_domain.pddl', './uploads/'+global.file2.name], callback)

          }
            /*if(error){
              throw error;
            }
            else{
              global.a = true;
              console.log(stdout);

              res.render('sub',{...{item: req.query.questions, stdout: stdout,  ...req.query, submitted: true}}) //spread 
            }

          })*/
        }

        //console.log('reached here')
     /*run the smtplan+ code on newfile.pddl  to generate code*/
    const myTimeout = setTimeout(myError, 1000);
    function myError() {
        var msg = "sorry mate! No plan"; 
        if (a== false) {
          res.render('sub',{...{item: req.query.questions, stdout: msg,  ...req.query, submitted: true}}) //spread 

        }
    }
    })
    
  }

  /*question 5*/ 
  if(req.query.questions == 'q5'){
    const python = execFile('python3',['contrastive_questions/question5.py',req.query.action, req.query.occ_time, './uploads/'+global.file1.name,'./uploads/'+global.file2.name],(error, stdout, stderror)=>{
      if (error){
        throw error
      }
      else{
        console.log(stdout);
        global.a = false;
      if(global.planner =='enhsp'){
        const enhsp = execFile('/usr/local/bin/ENHSP-Public/enhsp',['-o', 'modified_planning_problems/modified_q5_domain.pddl', '-f', 'modified_planning_problems/modified_q5_problem.pddl'],callback)

      }
      if(global.planner=='smtplan'){
        const smtplan = execFile('/usr/local/bin/SMTPlan/SMTPlan/build/SMTPlan',['modified_planning_problems/modified_q5_domain.pddl', 'modified_planning_problems/modified_q5_problem.pddl'], callback)

      }
      /*if(error){
        throw error;
      }
      else{
        global.a = true;
        console.log(stdout);

        res.render('sub',{...{item: req.query.questions, stdout: stdout,  ...req.query, submitted: true}}) //spread 
      }
    })*/

      }

       const myTimeout = setTimeout(myError, 1000);
      function myError() {
        var msg = "sorry mate! No plan"; 
        if (a== false) {
          res.render('sub',{...{item: req.query.questions, stdout: msg,  ...req.query, submitted: true}}) //spread 

        }
      }

    })

    
  }

  /*question 6*/
  console.log('now qs is '+req.query.questions)
  if(req.query.questions == 'q6'){
    
    const python = execFile('python3',['contrastive_questions/question6.py',req.query.plan_duration,'./uploads/'+global.file1.name,'./uploads/'+global.file2.name],(error, stdout, stderror)=>{
      if (error){
        throw error
      }
      else{
        console.log(stdout);
        global.a = false;
       if(global.planner =='enhsp'){
        const enhsp = execFile('/usr/local/bin/ENHSP-Public/enhsp',['-o', './uploads/'+global.file1.name, '-f', 'modified_planning_problems/modified_q6_problem.pddl'],callback)

       }
       if(global.planner=='smtplan'){
        const smtplan = execFile('/usr/local/bin/SMTPlan/SMTPlan/build/SMTPlan',['./uploads/'+global.file1.name, 'modified_planning_problems/modified_q6_problem.pddl'], callback)

       }
      /*if(error){
        throw error;
      }
      else{
        global.a = true;
        console.log(stdout);

        res.render('sub',{...{item: req.query.questions, stdout: stdout,  ...req.query, submitted: true}}) //spread 
      }
    })*/

      }

       const myTimeout = setTimeout(myError, 10000);
      function myError() {
        var msg = "sorry mate! No plan"; 
        if (a== false) {
          res.render('sub',{...{item: req.query.questions, stdout: msg,  ...req.query, submitted: true}}) //spread 

        }
      }

    })

    
  }

  /*question 7*/


  /*question 8*/
if(req.query.questions == 'q8'){
    const python = execFile('python3',['contrastive_questions/question8.py',req.query.plan_length, './uploads/'+global.file1.name,'./uploads/'+global.file2.name],(error, stdout, stderror)=>{
      if (error){
        throw error
      }
      else{
        console.log(stdout);
        global.a = false;
      if(global.planner =='enhsp'){
        const enhsp = execFile('/usr/local/bin/ENHSP-Public/enhsp',['-o', 'modified_planning_problems/modified_q8_domain.pddl', '-f', 'modified_planning_problems/modified_q8_problem.pddl'],callback)

      }
      if(global.planner =='smtplan'){
        const smtplan = execFile('/usr/local/bin/SMTPlan/SMTPlan/build/SMTPlan',['modified_planning_problems/modified_q8_domain.pddl', 'modified_planning_problems/modified_q8_problem.pddl'],callback)

      }
      /*if(error){
        throw error;
      }
      else{
        global.a = true;
        console.log(stdout);

        res.render('sub',{...{item: req.query.questions, stdout: stdout,  ...req.query, submitted: true}}) //spread 
      }
    })*/

      }

       const myTimeout = setTimeout(myError, 1000);
      function myError() {
        var msg = "sorry mate! No plan"; 
        if (a== false) {
          res.render('sub',{...{item: req.query.questions, stdout: msg,  ...req.query, submitted: true}}) //spread 

        }
      }

    })

    
  }

  
  
  fs.writeFile('terminal_question.txt',JSON.stringify(data),'utf8', (err)=>{
    if (err) console.log(err);
    
  })
})

router.get('/optimal',opt_plan) 
router.get('/optimal_len',opt_plan_len)
module.exports = router;
