import re
import sys
from collections import deque  

action = sys.argv[1]
#action = "(:action " + action
time = sys.argv[2]
domain_file = sys.argv[3]
problem_file = sys.argv[4]
f = open(domain_file)
domain = f.read()



new_action = f'{action}_new'

#last parenthesis of domain file

#delete it temporarily
domain = domain[:-2]


#stack implement of action
Stack= deque()	

#copy action
def copy_action(domain,action,rename,pre,eff):
	domain1= domain
	#find position of action
	actionPos = domain.find(action)
	#print(f'{actionPos}: {domain[actionPos]}')
	#find opening parentheses in the line of action
	parenPos = domain.rfind("(",0,actionPos)
	Stack.appendleft(domain[parenPos])
	#copy total method of action in the text
	temp="("
	
	#start iterating from parenpos until stack is not empty
	while True:
		for x in (domain[parenPos+1:]):
			if x!="(" or x!=")":
				pass
			if x =="(":
				
				#temp = temp+x
				Stack.appendleft(x)
			if x ==")":
				#temp=temp+x
				Stack.pop()
			temp= temp+x
			#print(f'{k}:{action}---------{temp}')
			if not Stack:
				#print("empty stack")
				break
		break
	#domain1 = domain1+ '\n'+temp
	#renaming the new actions
	temp = temp.replace(action,rename)
	#print(temp)  

	#search for precondition and replace "and with other text"
	precondition = temp.find("precondition")
	#search for first "and" after "precondition"
	andpos = temp.find("and",precondition+len("precondition"))
	#replace and with the passed predicate
	temp = temp[:andpos]+pre+temp[andpos+3:]
	
	#search for effect and replace and with other text
	effect = temp.find("effect")
	andpos = temp.find("and",effect+len("effect"))
	temp = temp[:andpos]+eff+ temp[andpos+3:]
	return temp





#find the action 
actionPos = domain.find(action)







#change the precondition
#pre_pos = domain.find("precondition", actionPos)
#search for first "and" after "precondition"
#andpos = domain.find("and",pre_pos+len("precondition"))
pre = f'and (< (running_time) {time})'
#domain = domain[:andpos]+pre+domain[andpos+3:]

#change in effect
#eff_pos = domain.find("effect", actionPos)
#search for first "and" after "effect"
#andpos = domain.find("and",eff_pos+len("effect"))
eff = f'and (do_before_new)'
#domain = domain[:andpos]+eff+domain[andpos+3:]

#change in predicate
predicates = domain.find(":predicates",0)
len_pred = len(":predicates")
#change predicate 
predic= f':predicates (do_before_new)'
domain =  domain[:predicates]+predic+domain[predicates+len_pred:]



temp = copy_action(domain, action,new_action,pre,eff)
domain = domain+'\n'+temp
domain = domain +")"

print(domain)
#write modified domain in the file
with open('modified_planning_problems/modified_q3_domain.pddl','w+') as file:
	file.writelines(domain)	

#change in problem file
f = open(problem_file)
problem = f.read()


#add predicate in the action stop
goal = problem.find("goal")
#search for first "and" after "goal"
andpos = problem.find("and",goal+len("goal"))
#replace and with the passed predicate
pre= f'and (do_before_new)'
problem = problem[:andpos]+pre+problem[andpos+3:]
print()
print()
print(problem)





with open('modified_planning_problems/modified_q3_problem.pddl','w+') as file:
	file.writelines(problem)		
	


'''
some updation can possible

if running_time is not there in the domain file then we have to write that in the function name

then made a process and add that at the end of the file
which capture the whole running_time of the program

After that all changes in the file 
'''
