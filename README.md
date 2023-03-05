# A Contrastive Explanation Service for Plans in Hybrid Domains
<br>
This project proposes a novel approach for generating optimal
plans in terms of *makespan* and plan length, by automating and iteratively generating Hypothetical
models. The proposed approach consists of three main steps:
(1) the automation of Hmodel generation, (2) the use of an
iterative model to obtain an optimal plan, and (3) the use of
both automation and iterative Hmodel generation to indepen-
dently generate an optimal plan, regardless of the user’s input.
The effectiveness of the proposed approach is demonstrated
through experiments and results show that it can outperform
existing approaches in terms of both accuracy and efficiency.
This paper contributes to the field of automated planning and
scheduling by providing a new and effective approach for de-
signing XAIP as a web service.
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
