import sys
import re
plan_length = sys.argv[1]
domain_file = sys.argv[2]
problem_file = sys.argv[3]
f = open(domain_file)
domain= f.read()

#declare s in the functions
functions = domain.find(":functions",0)
len_func = len(":functions")

func= f':functions (s)'
domain =  domain[:functions]+func+domain[functions+len_func:]




substring = "(:action "
sub_indices = []
actionList=[]
sub_indices=[i for i in range(len(domain)) if domain.startswith(substring, i)]

#print(sub_indices)
#find next newline 
for i in range (len(sub_indices)):

	new_line = domain.find("\n",sub_indices[i])

	actionList.append(domain[sub_indices[i]+len("(:action"):new_line])
print(actionList)
#in problem file init s and add constaints in goal

eff = f'and (increase (s) 1)'
for action in actionList:
	if action !=' stop':
		actionPos = domain.find(action)
		eff_pos = domain.find("effect", actionPos)
		andpos = domain.find("and",eff_pos+len("effect"))
		domain = domain[:andpos]+eff+domain[andpos+3:]
		#print("*"*20+domain)

for action in actionList:
	if action == ' stop':
		actionPos = domain.find(action)
		eff_pos = domain.find("effect", actionPos)
		parenPos = domain.find("(",eff_pos+len("effect"))
		print(domain[parenPos])
		eff = "(and (increase (s) 1) ("
		domain = domain[:parenPos]+eff+domain[parenPos+1:]
		domain = domain+")"
		
		
		
		
		
print(domain)

f= open(problem_file)
problem = f.read()

#change the init set

#add predicate in the action stop
goal = problem.find("goal")
#search for first "and" after "goal"
andpos = problem.find("and",goal+len("goal"))
constraint= f'and (< (s) {plan_length})'
problem = problem[:andpos]+constraint+problem[andpos+3:]


initpos = problem.find("init")
init_len = len("init")
init_s = f'init (= s 0)'
problem = problem[:initpos]+init_s+problem[initpos+init_len:]



print()
print(problem)

with open('modified_q8_domain.pddl','w+') as file:
	file.writelines(domain)

with open('modified_q8_problem.pddl','w+') as file:
	file.writelines(problem)