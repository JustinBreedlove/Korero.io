# **KORERO.IO**
## By TeamKorero

# How to Run ourDev  Environment:
 Clone this repo - cd into /API & /client and run npm install to install node_modules & dependencies - npm start in /API and npm start in  /client separately
Auto Run Dev Env: - npm install -g concurrently - npm run start

# Omar Issa:
Application coding was the main focus for Korero.io which includes setting up and developing the API for our application as well as the client side for Korero. This also includes scripts within the API that primarily focus on the use of Javascript for front-end and back-end code which include the appearance of how Korero.io would boot up when both the client and API are booted. On the client side, Omar has made scripts featuring how the group chat will look like and what styles each chatbox will look for the customer. On the API-side, This is responsible for core functionalities that are needed to function in korero.io such as live chat boxes, the sessions the user will interact in, and the overall user experience such as creating a user account for korero and interacting with other users.

# Harper Huff:
Omar got the Ubuntu 20.04 server connected to VPS where we have the code to run our front-end and back-end code for the website. Usually when you want to deploy the site you need to open two terminals so that you can run the Back end (API folder) and Front end (client folder) which will bring the website up for use. I got the front end and back end to run through one terminal using the command "npm start" This starts the API and client (in that order) using concurrently which was installed globally for the project. When this is run the website will open and can be used for development/ testing. 

i put my code in korero.io/package.json
{
  "name": "korrero",
  "version": "1.0.0",
  "scripts": {
    "start" : "concurrently "npm run api" "npm run client"",
    "api": "cd ./api && node ./bin/www",
    "client": "cd ./client && npm start"
  },
  "dependencies": {
    "debug": "~2.6.9",
    "concurrently": "^6.14.17"
  }
}
inside of scripts, we have a command for start, API, and client

The start script which brings the website alive uses npm run API first which goes into the API file and runs the script "node ./bin/www" to start the site's backend, it then runs npm run client which runs the client script and goes into the client file and runs npm start which runs the script "react-scripts start" which will run the front end and open the website. concurrently runs the two commands back to back in the same terminal and when we want to turn the website off we can use ctrl c to end the commands which will make the site unresponsive

# Justin Breedlove:
I am responsible for creating and connecting an artifact repository using docker for version control. We used this platform for a couple of different features. The main feature we wanted from this platform is of course the artifact repository for efficient CI/CD which allowed for easier version control. Another feature we leveraged was the security scan of the artifacts for potential vulnerabilities. I also implemented a checksum within the artifact repository to make sure files were not intercepted.

For The second part of my requirements, I used gitLab security and compliance to scan the code base and enforce security policies. After learning how to use GitLab security and compliance I engineered a Static Application Security Test (SAST) by developing a security script that scans all files and dependencies for potential weak points or vulnerabilities within the infrastructure. I then documented and reported the results of the SAST and communicated with the team any concerns regarding security.  

I Was also responsible for implementing secure firewall policies on the deployment server. To do this I used IPTables to configure a secure firewall that only allowed for secure traffic to our application. 

# Skandha Prakash:
I am responsible for Backup Data for the Ubuntu 20.04 VM through VPS.net and the backup through Gitlab which can be done on its own.
https://ec646b3c-e086-4901-a0ed-ed7b67f7d074.usc.xopero.com/git/gitlab

The second requirement for me was Writing the documentation on How we have to run our code as well as the progress that has been made so far for this project for this semester.

The Third requirement was to provide a IAAS equivalent /Cloud automation tool in order to design my code to run more efficiently through building using software such as Terraform to Check for vulnerabilities in the code and TeamCity to check through Logs and the build time progress when initially running with the API and the Client via npm run.
https://www.bridgecrew.cloud/supplyChain#status=OPEN&repositories=5cf0
https://korerro.teamcity.com/project/Korero?projectTab=overview&mode=t



#**KORERO.IO**

#By TeamKorero

# - Release notes as a package 

SAST and dependency report has been made and finished. Check the .yml file to see the script and run SAST node.js scan and semgrep tests.
