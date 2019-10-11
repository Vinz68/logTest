<img src="https://raw.githubusercontent.com/Vinz68/logTest/master/images/logTestImg.png" width="250"></img> 
## logTest 
is a minimal NodeJS app which will serve as a quick-start (template) for my next NodeJS projects. It includes logging (bunyan) a database (mongoDB) and a REST Webservice API (express).

## Purpose 
The goal of this logTest project is to build a minimal NodeJS application using best practises and available (free & frequently used) packages that meets the most often needed requirements.

## Requirements
Best practises requirements, we want:
- **open source**,
  - the choosen modules/tools/solutions need to be free (as in no costs) and have support of an active community.
- **logging**, 
  - with "context" like module/function, date/time stamp, log levels (debug info,warn, error as minimum)
  - support of configurable output (flat file, roling file, syslog, ..)
  - for now we will implement/use a rolling file output (so automatic cleanup of log files)
  - logging output suitable for filtering (and/or script processing for finding issues)
- **REST Webserivice API**,
  - we want to implement an API, so our webserver can give a response on a (web) request
  - we will return our response in JSON format
- **database storage**,
  - we need permanent storage in a database
  - using the API we can save & read data from it.
- **use build tools** 
  - unit testing (mocha, should, sinon)  
  - integration testing (supertest)
   - for automatic node restarts when source files are changes
  - compress/uglify source files to distribution folder 
- **security**

- https
  - mechanism to start the app after boot (we will use [PM2](http://pm2.keymetrics.io/)) 
  - targets Unix/Linux (will be tested on Ubuntu and Raspbian PI )


Not all of it will be implemented in the code; some aspects might need (free) third party tools and/or configuration settings.

| Packages        | Requirement           | install        |
|:---------------:| --------------------- | --------------:|
| gulp | Build-Tool, install it so it can run from command line |  |
|  | It can copy and uglify/compress source files | sudo npm install gulp -g ||  | to the destination/production folder |  |
|  | |  |
| gulp-nodemon | Build-Tool, detect source file changes | npm install gulp-nodemon --save-dev |
|  | |  |
| [bunyan](https://github.com/trentm/node-bunyan) | Logging | npm install bunyan --save |
|  | |  |
| express | REST API | npm install express --save |
|  | |  |
| mongoDB | Storage | www.mongodb.org (download & install) |
|  | |  |
| mongoose | Storage framework / using JSON to access the mongoDB | npm install mongoose --save |
|  | |  |
| body-parser | make json objects available in req.body | npm install body-parser --save |
|  | |  |
| mocha | unit testing framework. gulp-mocha is the gulp plugin of mocha, should = assertion framework, sinon = mocking framework | npm install gulp-mocha should sinon --save-dev |
|  | |  |
| supertest | intergration tests with supertest | npm install supertest gulp-env --save-dev |
|  | |  |



## Installation notes
1. fork this package to your github account


2. clone it from github to your local folder 
``` bash
git clone https://github.com/Vinz68/logTest.git
```


3. install node and npm when needed.   ( find [here](https://github.com/nodesource/distributions) how to install node)
   
   test first if you have node already installed. Let it show its version number

```
node --version
```



4. install its dependencies 
```
npm install
```
NOTE: Use npm install --only=production to install only dependencies, and not devDependencies,regardless of the value of the NODE_ENV environment variable.


5. install mongoDB   ([link](www.mongodb.org))


6. add test data in the mongoDB database (see [setupDB/README.md](https://github.com/Vinz68/logTest/blob/master/models/setupDB/))


7. run the program
```
gulp
```
or
```
node logTest.js
```
or use PM2 (auto start / auto restart)
```
pm2 start logTest.js
```



8. open a web browser and test with:
```
http://[your ip or domainname]:8088/api/books
```




9. test API using a tool like postman
```
# see postman folder with GET, PUT, POST, DELETE and PATCH requests.
```




10. execute the unit- and integration tests
(note you need to install gulp, see above in the table)
```
gulp test
```




11. show log output from the logfile 
(note you need to install bunyan, see above in the table)
```
cd logs
bunyan logTest.log 
```



## Contribute

Report a bug or a suggestion by posting an issue on the git repository (https://github.com/Vinz68/logTest/issues).

![Alt text](images/logTestImg.png?raw=true "logTest")


 
## TODO List:
 - [ ] include code quality check (JSLint or something else..)     
 - [ ] add choice of storage (MongoDB or Azure DocumentDB) 
 - [ ] add client which can consume the answer of the request(s) preferable a single page web-app (SPA; i think of an Angular2 app).
 - [ ] add client authentication using OAUTH2 



