# logTest
is a minimal NodeJS app (and guideline) which can serve as a starting point for my next (and your?) NodeJS project.
Its goal is to build a working application using available (free & frequently used) modules and best practises which fullfills the following requirements:
- nodeJS backed, kind of microservice which can respond on one or two requests 
- logging 
  - preferable to a rolling file (so automatic cleanup)
  - with "context" like module/function, date time, log levels (debug info,warn, error as minumum)
  - logging output suitable for machine/script processing (for finding issues)
- security
  - https
  - authentication
- targets Linux Ubuntu and Raspbian (PI) 
- the choosen modules/tools/solutions need to be free (as in no costs) and have support of an active community.
- mechanism to start the app after boot

Not all of it will be implemented in the code; some aspects might need (free) third party tools and/or configuration settings.

 
TODO:
- make a decent Readme / guideline for this log example
- make one or more (test) modules, see how logging is implemented there / and how context is maintained from the original request
- include code quality check (JSLint or something else) ?
- 


