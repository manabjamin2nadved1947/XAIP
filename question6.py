import sys
import re
plan_duration = sys.argv[1]
domain_file = sys.argv[2]
problem_file = sys.argv[3]
f = open(problem_file)
problem = f.read()

#find runnning time
runpos = problem.find("(<= (running_time)") 
s1 = problem[runpos:]
res = re.sub(r'\d+', plan_duration, s1)

if(runpos == -1):
	pass
	#change the goal state

problem = problem[:runpos]+res
# replace the digit with another

print(problem)
with open('modified_q6_problem.pddl','w+') as file:
	file.writelines(problem)
