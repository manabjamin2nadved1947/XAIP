import sys

action = sys.argv[1]
action = "(:action " + action
time = sys.argv[2]
domain_file =sys.argv[3]
#problem_file = sys.argv[4]
f = open(domain_file)
domain = f.read()

new_action = f'{action}{time}'


#find the action 
actionPos = domain.find(action)

#change the precondition
pre_pos = domain.find("precondition", actionPos)
#search for first "and" after "precondition"
andpos = domain.find("and",pre_pos+len("precondition"))
pre = f'and (> (running_time) {time})'
domain = domain[:andpos]+pre+domain[andpos+3:]

#change the action name by new_action
domain = domain.replace(action,new_action)
print(domain)

#write modified domain in the file
with open('modified_q2_domain.pddl','w+') as file:
	file.writelines(domain)	



'''
some updation can possible

if running_time is not there in the domain file then we have to write that in the function name

then made a process and add that at the end of the file
which capture the whole running_time of the program

After that all changes in the file 
'''