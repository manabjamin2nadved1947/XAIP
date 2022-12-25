import sys
import re
plan_duration = sys.argv[1]
domain_file = sys.argv[2]
problem_file = sys.argv[3]
f = open(domain_file)
domain= f.read()

#declare s in the functions

#find all actions

#change the actions effects 



#in problem file init s and add constaints in goal

f= open(problem_file)
problem = f.read()

#change the init set

#add predicate in the action stop
goal = problem.find("goal")
#search for first "and" after "goal"
andpos = problem.find("and",goal+len("goal"))

initpos = problem.find("init")
init_len = len("init")
init_s = f'init (= s 0)'
#problem = problem[:andpos]+constraint+problem[andpos+3:]


#find runnning time
runpos = problem.find("(<= (running_time)")
s1 = problem[runpos:]
res = re.sub(r'\d+', plan_duration, s1)

problem = problem[:runpos]+res
# replace the digit with another

print(problem)

with open('modified_q8_problem.pddl','w+') as file:
	file.writelines(problem)