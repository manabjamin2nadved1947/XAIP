#enumerate lines in file
import re
import sys
from collections import deque  

with open('output.txt') as reader, open('output.txt', 'r+') as writer:
	for line in reader:
		if line.strip():
			writer.write(line)
	writer.truncate()

f= open('output.txt')
txt = f.read()
f= open('output.txt')
txt1 = f.readlines()


'''
for line in txt1:
	print(line)
'''
def find_ith_newline_action(txt, action, i):
	a=[]
	start = txt.find(action)
	newline =  txt.find('\n')
	while start >= 0 and i > 1:
		newline =  txt.find('\n', start+len(action))
		start = txt.find(action, start+len(action))
		
		i -= 1
	a.append(start)
	a.append(newline)
	return a #[action ,beginning of the line where action resides]


#print(txt[find_ith(txt,'decelerate',2)])
#print(find_ith(txt,'decelerate',2))

# make an array of actions
start = '\t'
end =' '
actionList=[]
for i in range(len(txt1)):
	s= txt1[i]
	#print(s)
	t=s[s.find(start)+len(start): s.find(end)]
	#print(t)
	actionList.append(t)
print(actionList)

#remove parentheses from the actionList
pattern = r'[\( \)]'
for i in range(len(actionList)):
	temp = re.sub(pattern,"",actionList[i])
	actionList[i]=temp
print(actionList)
#search which line for ith instance of action a
action = sys.argv[1]
i= int(sys.argv[2])-1
b= sys.argv[3]
domain_file = sys.argv[4]
problem_file = sys.argv[5]
#number of line preceding ith action
j=[j for j, n in enumerate(actionList) if n==action][i] #replace 1 with i

#print(f'{action} is in line {j+1}')

#appending upto i-1th element
modifiedActionList=[]
for x in range(j):
	modifiedActionList.append(actionList[x])
print(f'modifiedActionList is {modifiedActionList}')
# make a dictionary of action and frequency upto i-1th action
dictionary = {x:modifiedActionList.count(x) for x in modifiedActionList}
print("-"*20, dictionary.keys())


#remove blank line from domain file
with open(domain_file) as reader, open(domain_file, 'r+') as writer:
	for line in reader:
		if line.strip():
			writer.write(line)
	writer.truncate()
f = open(domain_file)
domain = f.read()

#last parenthesis of domain file

#delete it temporarily
domain = domain[:-2]


#write something in specific point in string

def insert_str(string, str_to_insert, index):
	return string[:index] + str_to_insert + string[index:]

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



#stack implement of action
Stack= deque()	
count=0
predicates_list=[]
for x in dictionary:
	prev_to_action= x
	frequency=dictionary[x]
	#print(f'action :{prev_to_action}, frequency: {frequency}')
	for k in range(frequency):

		temp=""
		count+=1
		
		rename = prev_to_action+f'_{count}'
		predicates_list.append(rename)
		if count ==1:
			pre = f'and (not (has_done_{rename}))'
			eff = f'and (has_done_{rename})'

		else:
			
			#prev_count= count-1
			pre = f'and (not (has_done_{rename})) (has_done_{prev_rename})'
			eff = f'and (has_done_{rename})'
		temp=copy_action(domain, prev_to_action,rename,pre,eff)
		prev_rename= rename
		domain = domain+ '\n'+temp
		#print(f'{k}:{prev_to_action}---------{domain}')
		#search for predicate to change
		
				
		

		#
		#print(domain)
		#domain.replace("predicates",predic)
		
print("*"*50)


#add the last deleted parenthesis 
#domain = domain+')'



#add action b 
b_name = f'{b}_{count+1}'
predicates_list.append(b_name)
pre = f'and (not (has_done_{b_name})) (has_done_{rename})'
eff = f'and (has_done_{b_name})'
#no problem in this assignment
t=copy_action(domain,b,f'{b}_{count+1}',pre,eff)
domain = domain+'\n'+t

#modify predicates
#search for predicates to change
print(f'predicates list {predicates_list}')	
for i in range(len(predicates_list)):
	predicates = domain.find(":predicates",0)
	len_pred = len(":predicates")
	#change predicate 
	predic= f':predicates (has_done_{predicates_list[i]})'

	domain =  domain[:predicates]+predic+domain[predicates+len_pred:]
	





'''
#add predicate in the action stop
stop = domain.find("action stop")
#search for first "and" after "stop"
andpos = domain.find("and",stop+len("action stop"))
#replace and with the passed predicate
pre= f'and (has_done_{b_name})'
domain = domain[:andpos]+pre+domain[andpos+3:]
domain = domain + ')'
'''


#unique set of actions
unique_set = set(actionList)
print(f'unique set of actions {unique_set}')
for i in unique_set:
	find_i = domain.find(f"action {i}")
	andpos = domain.find("and",find_i+len(f"action {i}"))
	pre = f'and (has_done_{b_name})'
	print("***",domain[:andpos]+pre,"***")
	domain = domain[:andpos]+pre+domain[andpos+3:]
domain = domain +")"

print(domain)

#change in problem file


f = open(problem_file)
problem = f.read()

#add predicate in the action stop
goal = problem.find("goal")
#search for first "and" after "goal"
andpos = problem.find("and",goal+len("goal"))

#if andpos returns -1 replace goal by the predicate
if andpos==-1:
	pre = f'goal ( and(has_done_{b_name})'
	problem = problem[:goal]+pre+problem[goal+4:]
	problem = problem +")"
else:
	#replace and with the passed predicate
	pre= f'and (has_done_{b_name})'
	problem = problem[:andpos]+pre+problem[andpos+3:]
print()
print()
print(problem)

#write both dom/prob in new file
#write modified domain in the file
with open('modified_q1_domain.pddl','w+') as file:
	file.writelines(domain)	
#write modified problem in the file
with open('modified_q1_problem.pddl','w+') as file:
	file.writelines(problem)		
	