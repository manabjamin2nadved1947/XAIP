# A Contrastive Explanation Service for Plans in Hybrid Domains
<br>
In this paper, we present a tool interface as a web service for generating contrastive explanations of plans in hybrid domains. The interface presents the user with a collection of contrastive questions over a plan in a hybrid domain. The tool produces an explanation of the user question by contrasting the plan against the best alternative that the planner under consideration can generate in terms of makespan and plan-length. The tool consists of : (1) A GUI for posing questions, viewing contrastive plans and the generated explanations thereof (2) A backend implementing an iterative re-modeling and re-planning algorithm to obtain a contrastive plan. We present results on the execution of our tool on some benchmark examples.
<br>
<br>

## Prerequisites

Before running this application, make sure you have the following installed in your device:

- [Node.js](https://nodejs.org/en/) version 12.x or later
- [npm](https://www.npmjs.com/) package manager
- [SMTPLAN+](https://github.com/KCL-Planning/SMTPlan) AI Planner 

## Installing Dependencies

After cloning the repository, navigate to the project directory in your terminal and run the following command to install the required dependencies:
`npm install`


## Running the Application

Once the dependencies are installed, you can start the application using the following command: `npm start`

This will start the Node.js server and the application will be accessible at `http://localhost:3000`.


## Note 

Try domain/problem files from [Uploads](https://github.com/manabjamin2nadved1947/XAIP/tree/main/uploads) folder to run the Web-service efficiently
<br>
After downloading, install nodejs (using Ubuntu) by the following command : `sudo apt-get install -y nodejs
`
<br>
Once the SMTPLAN+ is installed in the common location, you have to copy the SMTPLAN+ in the _/usr/local/bin directory_ , using the command: `sudo cp -r /path/to/your/file /usr/local/bin/
`  
