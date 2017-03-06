# logTest
is a minimal NodeJS app which will serve as a quick-start (template) for my next NodeJS projects.

## Description 
Its goal is to build a minimal NodeJS application using best practises and available (free & frequently used) packages that meets the most often needed requirements.


## Requirements
Best practises requirements:
- the choosen modules/tools/solutions need to be free (as in no costs) and have support of an active community.
- logging , 
  - with "context" like module/function, date/time stamp, log levels (debug info,warn, error as minimum)
  - support of configurable output (flat file, roling file, syslog, ..)
  - for now we will implement/use a rolling file output (so automatic cleanup of log files)
  - logging output suitable for filtering (and/or script processing for finding issues)
- implement REST Webserivice
- security
  - https
  - authentication (OAUTH2 - TODO)
- mechanism to start the app after boot (use PM2)
- targets Unix/Linux (will be tested on Ubuntu and Raspbian PI )


Not all of it will be implemented in the code; some aspects might need (free) third party tools and/or configuration settings.

 
## TODO List:
- make a decent Readme / guideline for this log example
- include code quality check (JSLint or something else) ?
- include deployment script (use grunt/gulp ?)
- add one or more (test) modules, see how logging is implemented there / and how context is maintained from the original request
- find a general purpose (so understanding might be easier).
- add client which can consume the answer of the request(s) preferable a single page web-app (SPA; i think of an Angular2 app).





