# logTest
is a minimal NodeJS app which can serve as a starting point for my next (and yours?) NodeJS project.

## Description [todo]

## Requirements
Its goal is to build a working application using available (free & frequently used) packages and best practises which fullfills the following requirements:
- nodeJS backed, kind of microservice which can respond on a few (example) requests
- logging , 
  - preferable to a rolling file (so automatic cleanup)
  - with "context" like module/function, date/time stamp, log levels (debug info,warn, error as minimum)
  - logging output suitable for machine/script processing (for finding issues)
- security
  - https
  - authentication (TODO)
- targets Linux (will be tested on Ubuntu and Raspbian (PI) )
- the choosen modules/tools/solutions need to be free (as in no costs) and have support of an active community.
- mechanism to start the app after boot

Not all of it will be implemented in the code; some aspects might need (free) third party tools and/or configuration settings.

 
## TODO List:
- make a decent Readme / guideline for this log example
- include code quality check (JSLint or something else) ?
- include deployment script (use grunt/gulp ?)
- add one or more (test) modules, see how logging is implemented there / and how context is maintained from the original request
- find a general purpose (so understanding might be easier).
- add client which can consume the answer of the request(s) preferable a single page web-app (SPA; i think of an Angular2 app).



