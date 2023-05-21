const { execFileSync } = require('child_process');
const{execFile} = require('child_process');
const path = require('path');

var util = require('util');
var express = require('express');
var app =  express();

module.exports = async(req, res,next) => {
 //const questions = req.session.questions;
 
 console.log("***************in opt_plan_len")

 console.log(global.sub_query_qs)
 var data = global.sub_query_qs
 
 var callback = (error,stdout,stderror)=>{
 if(error) throw error
 	else{
 		console.log(stdout)
 		res.render('optimal',{data:stdout, planner: global.planner})

		}
 				
 }
//console.log(data.questions)
 if(data == 'q1'){
 	if(global.planner =='smtplan'){
 		const python = execFileSync('python3',['optimal_plans/automaticplanlength.py','modified_q1_domain.pddl', 'modified_q1_problem.pddl','modified_q8_domain.pddl','modified_q8_problem.pddl'])
 			/*if(error) throw error
 			else{*/
 				console.log(python.toString())
                res.render('optimal',{data:python.toString(), planner: global.planner})
 				//const smtplan = execFile('/usr/local/bin/SMTPlan/SMTPlan/build/SMTPlan',['modified_q1_domain.pddl', 'modified_q1_problem.pddl'], callback)

 			}		
 		if(global.planner =='enhsp'){

 		}

 	}
 	if (data == 'q2'){
 		if(global.planner =='smtplan'){
 			const python = execFileSync('python3',['optimal_plans/automaticplanlength.py','modified_q2_domain.pddl', './uploads/'+global.file2.name,'modified_q8_domain.pddl','modified_q8_problem.pddl'])
 			console.log(python.toString())
            res.render('optimal',{data:python.toString(), planner: global.planner})
 			//const smtplan = execFile('/usr/local/bin/SMTPlan/SMTPlan/build/SMTPlan',['modified_q2_domain.pddl', './uploads/'+global.file2.name], callback)

 		}
 		if(global.planner =='enhsp'){

 		}
 	}
 	if(data =='q3'){
 		if(global.planner=='smtplan'){
 			const python = execFileSync('python3',['optimal_plans/automaticplanlength.py','modified_q3_domain.pddl', 'modified_q3_problem.pddl','modified_q8_domain.pddl','modified_q8_problem.pddl'])
 			console.log(python.toString())
            res.render('optimal',{data:python.toString(), planner: global.planner})

 			//const smtplan = execFile('/usr/local/bin/SMTPlan/SMTPlan/build/SMTPlan',['modified_q3_domain.pddl', 'modified_q3_problem.pddl'], callback)

 		}
 		if(global.planner =='enhsp'){

 		}
 	}

 	if(data =='q4'){
 		if(global.planner=='smtplan'){
 			const python = execFileSync('python3',['optimal_plans/automaticplanlength.py','modified_q4_domain.pddl', './uploads/'+global.file2.name,'modified_q8_domain.pddl','modified_q8_problem.pddl'])
 			console.log(python.toString())
            res.render('optimal',{data:python.toString(), planner: global.planner})

 			//const smtplan = execFile('/usr/local/bin/SMTPlan/SMTPlan/build/SMTPlan',['modified_q4_domain.pddl', './uploads/'+global.file2.name], callback)

 		}
 		if(global.planner =='enhsp'){

 		}
 	}

 	if(data =='q5'){
 		if(global.planner=='smtplan'){
 			const python = execFileSync('python3',['optimal_plans/automaticplanlength.py','modified_q5_domain.pddl', 'modified_q5_problem.pddl','modified_q8_domain.pddl','modified_q8_problem.pddl'])
 			console.log(python.toString())
            res.render('optimal',{data:python.toString(), planner: global.planner})

 			//const smtplan = execFile('/usr/local/bin/SMTPlan/SMTPlan/build/SMTPlan',['modified_q5_domain.pddl', 'modified_q5_problem.pddl'], callback)

 		}
 		if(global.planner =='enhsp'){

 		}
 	}

 	if(data =='q6'){
 		if(global.planner=='smtplan'){
 			const python = execFileSync('python3',['optimal_plans/automaticplanlength.py','./uploads/'+global.file1.name, 'modified_q6_problem.pddl','modified_q8_domain.pddl','modified_q8_problem.pddl'])
 			console.log(python.toString())
            res.render('optimal',{data:python.toString(), planner: global.planner})

 			//const smtplan = execFile('/usr/local/bin/SMTPlan/SMTPlan/build/SMTPlan',['./uploads/'+global.file1.name, 'modified_q6_problem.pddl'], callback)

 		}
 		if(global.planner =='enhsp'){

 		}
 	}

 	/*if(data =='q7'){
 		if(global.planner=='smtplan'){
 			const python = execFileSync('python3',[])
 			console.log(python.toString())
 			const smtplan = execFile('/usr/local/bin/SMTPlan/SMTPlan/build/SMTPlan',['modified_q2_domain.pddl', './uploads/'+global.file2.name], callback)

 		}
 		if(global.planner =='enhsp'){

 		}
 	}*/

 	  if(data =='q8'){
 		if(global.planner=='smtplan'){
 			const python = execFileSync('python3',['optimal_plans/automaticplanlength.py','modified_q8_domain.pddl', 'modified_q8_problem.pddl','modified_q8_domain.pddl','modified_q8_problem.pddl'])
 			console.log(python.toString())
            res.render('optimal',{data:python.toString(), planner: global.planner})

 			//const smtplan = execFile('/usr/local/bin/SMTPlan/SMTPlan/build/SMTPlan',['modified_q8_domain.pddl', 'modified_q8_problem.pddl'], callback)

 		}
 		if(global.planner =='enhsp'){

 		}
 	} 	 	
}


