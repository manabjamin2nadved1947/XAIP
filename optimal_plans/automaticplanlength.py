#run smtplan
import subprocess
import sys
import re
import os
#extract number of lines in plan (plan length)
def extract_len(result):
    t =result.stdout.decode('utf-8')
    l= t.split('\n')
    l = [i for i in l if i]
    
    res = len(l)
    #print(res)
    return res


def run_smtplan(dom_file, prob_file):
    result=""
    try:

        result = subprocess.run(['/home/devdan/SMTPlan/SMTPlan/build/SMTPlan',dom_file,prob_file],timeout =10,capture_output=True)
        if result.stderr :
            result ="-1"
    except subprocess.TimeoutExpired:
        result ="-1"
        #print("timeout")
    return result


#run the already written program to change running time in problem file
def run_file(length):
    length = int(length)
    run = subprocess.run(['python3', 'question8.py',str(length),sys.argv[1],sys.argv[2]],capture_output=True)


res = run_smtplan(sys.argv[1],sys.argv[2]) #domain /problem 
print(res.stdout.decode('utf-8'))
length =extract_len(res)

while(res!="-1"):
    length =int(length)
    length =length-1
    print(f'trying with length {length}')
    run_file(length)
    res = run_smtplan(sys.argv[3],sys.argv[4]) #modifiedq8 dom/prob
    
    if res!="-1": 

        print(res.stdout.decode('utf-8'))
        length = extract_len(res)
    else:
        print("no plan")
#print(res.stdout.decode('utf-8'))
print(f"optimal length is {length+1}")

