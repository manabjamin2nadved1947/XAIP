from collections import deque  
import re
import sys #for argument passing 

class Stack:
	def __init__(self):
			self._arr = []
	def push(self,val):
		self._arr.append(val)
	def is_empty(self):
		return len(self._arr) == 0
	def pop(self):
		if self.is_empty():
			print("Stack is empty")
			return
		return self._arr.pop()


S= deque()	
pattern  = r"^[^\(  \)]+" #any string until ( or )


with open('myfile.txt','r') as f:
	txt = f.readlines()

#print(txt)

#modify
# search for the line where "action" is there
#action = "accelerate"
action = str(sys.argv[1])
#print(action)
for line_i, line in enumerate(txt):
	if action in line:
		#print(f"action in line {line_i}: {line}")
		break

#search for first "(" in line_i
for x,ch in enumerate(txt[line_i]):
	if "(" in ch:
		break
#pos(first "(") = x

#append it in the stack
S.append(txt[line_i][x])
#delete the bracket
txt[line_i] = txt[line_i][1:]

while (action == sys.argv[1]):
	
	#print()
	#loop from line_i where action found
	for  i in range (line_i,len(txt)):
	
		#go through the lines and delete each character until found any parentheses
		txt[i] = re.sub(pattern, '',txt[i].replace(" ",""))
	
		#print(txt[i])

		#print(txt[i][0:1]) #first character of the line
		#curr_char = txt[i][0:1] #not gonna work
		while(len(txt[i])!=0):
			if ('('  == txt[i][0:1]):
				S.append(txt[i][0:1])	
				txt[i] = txt[i][1:] # delete the bracket
				#run again to delete every character until any parantheses
				txt[i] = re.sub(pattern, '',txt[i].replace(" ",""))
				#print(txt[i])
			if(')' == txt[i][0:1]):
				S.pop()
				txt[i] =txt[i][1:]
				txt[i] = re.sub(pattern, '',txt[i].replace(" ",""))
				#print(txt[i])
		if not S:
			break
	break

for x in txt:
	print(x)

#write modified domain in the file
with open('newfile.pddl','w+') as file:
	file.writelines(txt)		

"""
	if curr_char in line:
		line_i = i
		print(f"char at line {i}")
		line.replace(curr_char,'',1)
		line = re.sub(pattern, '',line.replace(" ",""))
		print("****",line)
"""


#print the string where action is there
"""
action = "action"
print(f"length of the txt is {len(txt)}")
for i, line in enumerate(txt):
	if action in line:
		print(f"action in line {i}: {line}")
		break
#print all line from i to end
for x in range (i, len(txt)):
	print(txt[x][])
"""		
