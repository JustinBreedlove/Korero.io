# **KORERO.IO**
## By TeamKorero

# How to Run ourDev  Environment:
 Clone this repo - cd into /api & /client and run npm install to install node_modules & dependencies - npm start in /api and npm start in  /client separately
Auto Run Dev Env: - npm install -g concurrently - npm run start

# Omar Issa:
Application coding was the main focus for Korero.io which includes setting up and developing the API for our application as well as the client side for korero. This also includes scripts within the API which primarily focus on the use of Javascripts for front-end and back-end code which include the appearance of how Korero.io would boot up when both client and api are booted. In the client side, Omar has made scripts featuring how the group chat will look like and what styles each chatbox will look for the customer. At the API-side, This is responsible for core functionalities that are needed to function in korero.io such as live chat boxes, the sessions the user will interact in and the overall user experience such as creating a user account for korero and interacting with other users.

# Harper Huff:
Omar got the ubuntu 20.04 server connected to VPS where we have the code to run our front end and back end code for the website. Usually when you want to deploy the site you need to open two terminals so that you can run Back end (API folder) and Front end (client folder) which will bring the website up for use. I got the front end and back end to run through one terminal using command "npm start" this starts the api and client (in that order) using concurrently which was installed globally for the project. When this is run the website will open and can be used for development/ testing. 

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
inside of scripts we have a command for start, api, and client

The start script which brings the website alive uses npm run api first which goes into the api file and runs the script "node ./bin/www" to start the site's backend, it then runs npm run client which runs the client script and goes into the client file and runs npm start which runs the script "react-scripts start" which will run the front end and open the website. concurrently runs the two commands back to back in the same terminal and when we want to turn the website off we can use ctrl c to end the commands and will make the site unresponsive

# Justin Breedlove:
For my part I created and connected a Jfrog artifact repository using docker for version control.

 For The second part of my requirements I used gitLab security and compliance to scan code base and enforce security policies.

# Skandha Prakash:
I am responsible for Backup Data for the Ubuntu 20.04 VM through VPS.net and the backup through Gitlab which can be done on its own.
https://ec646b3c-e086-4901-a0ed-ed7b67f7d074.usc.xopero.com/git/gitlab

The second requirement for me was Writing the documentation on How we have to run our code as well as the progress that has been made so far for this project for this semester.

The Third requirement was to provide a IAAS equivalent /Cloud automation tool in order to design my code to run more efficiently through building using softwares such a Terraform to Check for vulnerabilities for the code and TeamCity to check through Logs and the build time progress when initially running with the API and the Client vie npm run.
https://www.bridgecrew.cloud/supplyChain#status=OPEN&repositories=5cf0
https://korerro.teamcity.com/project/Korero?projectTab=overview&mode=t



#**KORERO.IO**

#By TeamKorero

# TODO - Justin - Configure Firewall script on Deployment server.
# - release notes as a package 

SAST and dependacy report has been made and finished. Check .yml file to see script and run SAST node.js scan and semgrep tests.
