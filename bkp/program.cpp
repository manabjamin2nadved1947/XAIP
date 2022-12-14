#include<iostream>
#include<fstream>
#include<string>
using namespace std;

int main(int argc, char** argv){
	string fname1 = argv[1];
	string fname2 = argv[2];
	
	//read the content of two file
	fstream f1, f2;
	string line1, line2, lines;
	
	//f1.open(fname1, fstream::in | fstream::out|fstream::app);
	//f2.open(fname2, fstream::in | fstream::out|fstream::app);
	
	f1.open(fname1);
	f2.open(fname2);
	
	//fpointer point at beginning the file
	f1.seekg(0,ios::beg);
	
	do{
		getline(f1, line1);
		cout<< line1 <<endl;
		lines = lines + line1;	
	} while(f1);
	
	while(f2){
		getline(f2, line2);
		cout<< line2 <<endl;
		lines = lines + line2;
	} f2.close();
	
	//concat the words
	//string lines = line1 +line2;
	//cout<<lines<<endl;
	//write on a new file 
	ofstream fout("file3");
	fout<<lines;
	fout.close();
	
	cout << "Read these texts \n";
	//cout << lines;
	cout << "file3";
	return 0;
}
