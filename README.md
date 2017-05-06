|:---------------:| --------------------- | 
| <img src="https://raw.githubusercontent.com/Vinz68/logTest/master/images/logTestImg.png" width="250"></img> | ## logTest is a minimal NodeJS app which will serve as a quick-start (template) for my next NodeJS projects. t includes logging (bunyan) a database (mongoDB) and a REST Webservice API (express).  | 










<img src="https://raw.githubusercontent.com/Vinz68/logTest/master/images/logTestImg.png" width="250"></img> 
## logTest 
is a minimal NodeJS app which will serve as a quick-start (template) for my next NodeJS projects.

It includes logging (bunyan) a database (mongoDB) and a REST Webservice API (express).


## Description
A NodeJS app is basically a lightweight webserver. The server side scripting is done in JavaScript (the 'js' part in NodeJS).

The goal of this logTest project is to build a minimal NodeJS application using best practises and available (free & frequently used) packages that meets the most often needed requirements.

## Requirements
Best practises requirements:
- the choosen modules/tools/solutions need to be free (as in no costs) and have support of an active community.
- use build tools 
  - for automatic node restarts when source files are changes
  - compress/uglify source files to distribution folder
  - automatic unit testing
- logging , 
  - with "context" like module/function, date/time stamp, log levels (debug info,warn, error as minimum)
  - support of configurable output (flat file, roling file, syslog, ..)
  - for now we will implement/use a rolling file output (so automatic cleanup of log files)
  - logging output suitable for filtering (and/or script processing for finding issues)
- REST Webserivice API,
  - we want to implement an API, so our webserver can give a response on a (web) request
  - we will return our response in JSON format
- storage,
  - we need permanent storage in a database
  - using the API we can save & read data from it.
- security
  - https
- mechanism to start the app after boot (we will use [PM2](http://pm2.keymetrics.io/))
- targets Unix/Linux (will be tested on Ubuntu and Raspbian PI )


Not all of it will be implemented in the code; some aspects might need (free) third party tools and/or configuration settings.


| Packages        | Requirement           | install        |
|:---------------:| --------------------- | --------------:|
| gulp | Build-Tool, install it so it can run from command line |  |
|  | It can copy and uglify/compress source files | sudo npm install gulp -g |
|  | to the destination/production folder |  |
|  | |  |
| gulp-nodemon | Build-Tool, detect source file changes | sudo npm install gulp-nodemon --save-dev |
|  | |  |
| bunyan | Logging | npm install bunyan --save |
|  | |  |
| express | REST API | npm install express --save |
|  | |  |
| mongoDB | Storage | www.mongodb.org (download & install) |
|  | |  |
| mongoose | Storage framework / using JSON to access the mongoDB | npm install mongoose --save |
|  | |  |
| body-parser | make json objects available in req.body | npm install body-parser --save |
|  | |  |


## Installation notes
1. fork this package to your github account
2. clone it from github to your server 
``` bash
git clone https://github.com/[your-account-name-here]/logTest.git
```
3. install its dependencies 
```
npm install
```
NOTE: Use npm install --only=production to install only dependencies, and not devDependencies,regardless of the value of the NODE_ENV environment variable.

4. install mongoDB (see www.mongodb.org)
5. add test data in the mongoDB database (see setupDB/README.md](https://github.com/Vinz68/logTest/blob/master/models/setupDB/))
6. run the program
```
node logTest.js
or
gulp
```

7. open a web browser on:  http://your-ip/books


 
## TODO List:
- include code quality check (JSLint or something else) ?
- add athentication using OAUTH2
- include deployment script (use grunt/gulp ?)
- add one or more (test) modules, see how logging is implemented there / and how context is maintained from the original request
- find a general purpose (so understanding might be easier).
- add client which can consume the answer of the request(s) preferable a single page web-app (SPA; i think of an Angular2 app).
- add choice of storage (MongoDB or Azure DocumentDB)


![Alt text](images/logTestImg.png?raw=true "logTest")


