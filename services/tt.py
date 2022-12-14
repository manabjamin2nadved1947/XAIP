"""
import re

file_path = "myfile.txt" 

with open(file_path, "r") as f: 
    data = f.readlines() 
print(data)
data = "".join(data).replace("\n", "")
data = re.sub(r'if \(aaaaa == b\) \{.*?\}', 'this is a replacement', data, flags=re.DOTALL)
print(data)

with open(file_path, 'w') as f:   
    f.write(data)
"""
import sys

print(f"hello world")
sys.stdout.flush()

