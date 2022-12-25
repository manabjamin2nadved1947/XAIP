import sys

action = sys.argv[1]
action = "(:action " + action
occur_time = sys.argv[2]
domain_file = sys.argv[3]
problem_file = sys.argv[4]
f = open(domain_file)
domain = f.read()




#add predicate to the effect
actionPos = domain.find(action)
#change in effect
eff_pos = domain.find("effect", actionPos)
#search for first "and" after "effect"
andpos = domain.find("and",eff_pos+len("effect"))
eff = f'and (increase (s) 1)'
domain = domain[:andpos]+eff+domain[andpos+3:]



#change in functions
functions = domain.find(":functions",0)
len_func = len(":functions")

func= f':functions (s)'
domain =  domain[:functions]+func+domain[functions+len_func:]

#change the action name by new_action
new_action = f'{action}1'
domain = domain.replace(action,new_action)
print(domain)
#write modified domain in the file

with open('modified_q5_domain.pddl','w+') as file:
	file.writelines(domain)	


#add predicate to the goal state of problem file 
#change in problem file
f = open(problem_file)
problem = f.read()


#add predicate in the action stop
goal = problem.find("goal")
#search for first "and" after "goal"
andpos = problem.find("and",goal+len("goal"))

constraint= f'and (< (s) {occur_time})'
problem = problem[:andpos]+constraint+problem[andpos+3:]

#change the init set
initpos = problem.find("init")
init_len = len("init")
init_s = f'init (= s 0)'

problem = problem[:initpos]+init_s+problem[initpos+init_len:]
print()
print()
print(problem)


with open('modified_q5_problem.pddl','w+') as file:
	file.writelines(problem)