with open('extras/output.txt') as reader, open('extras/output.txt', 'r+') as writer:
	for line in reader:
		if line.strip():
			writer.write(line)
	writer.truncate()

f= open('extras/output.txt')
txt = f.read()
f= open('extras/output.txt')
txt1 = f.readlines()

for line in txt1:
	print(line)
