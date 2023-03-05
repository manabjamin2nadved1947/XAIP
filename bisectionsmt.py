import subprocess
import sys
import re
import os


#extract last runnning time from the resulting plan
def extract_time(result):
    t =result.stdout
    l= t.splitlines()
    res = re.findall(r'\d+\.\d+', l[-1].decode('utf-8'))
    return res[0]



#run the already written program to change running time in problem file
def run_file(time):
    run = subprocess.run(['python3', 'question6.py',time,sys.argv[1],sys.argv[2]],capture_output=True)


def run_smtplan(dom_file, prob_file):
    result=""
    try:

        result = subprocess.run(['/home/devdan/SMTPlan/SMTPlan/build/SMTPlan',dom_file,prob_file],timeout =10,capture_output=True)
        if result.stderr:
            result ="-1"
    except subprocess.TimeoutExpired:
        result ="-1"
        #print("timeout")
    return result



#running before bisection method

result = run_smtplan(sys.argv[1],sys.argv[2]) #domain, problem
curr_time = extract_time(result)
run_file(str(curr_time))
old_time=0

r = run_smtplan(sys.argv[1],sys.argv[3]) #dom, modified problem
while(r !="-1"):
    old_time = float(curr_time)
    curr_time =old_time//2
    run_file(str(curr_time)) #to modify the problem file
    r = run_smtplan(sys.argv[1],sys.argv[3])
    if(r!="-1"):
        curr_time = extract_time(r) #getting new time 
    #print("*"*50)
    #print(r)

print(f'curr_time ={curr_time} and old_time = {old_time}')


#bisection method

def bisection(old_time, curr_time, tol):
  
    
    old_time =float(old_time)
    curr_time = float(curr_time)
    print(f"bisection {curr_time}  and {old_time}")
    if abs(curr_time - old_time) < tol:
        return str(old_time)
    #old_time =curr_time
    c= (old_time+curr_time)/2
    run_file(str(c))
    r = run_smtplan(sys.argv[1],sys.argv[3])

    #if no plan
    if(r=="-1"):
       return bisection(old_time,c,tol)
       #print(f"no plan here at time {temp}")
    #if some plan exists
    if(r !='-1'):
        old_time = extract_time(r)
        return bisection(old_time,curr_time,tol)
        #print(f"some plan here at time {temp}")


optimal_time = bisection(old_time,curr_time,0.05)
run_file(str(optimal_time))
#print(float(optimal_time))



#command line input
#python3 bisectionsmt.py car_domain_nodrag.pddl car_prob01.pddl modified_q6_problem.pddl 
