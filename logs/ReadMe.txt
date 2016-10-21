# Show logTest.log
bunyan logTest.log

# .. in short notation
bunyan -o short logTest.log

# View multiple files
bunyan logTest.log [bar.log ...]

# Filter on a unique request id
bunyan -c 'this.reqId=="5b9130bb-1e29-4627-8393-1a98d0d27691"' logTest.log

# Filter on an IP
bunyan -c this.reqIp=="::ffff:192.168.178.24" logTest.log

# Filter on a certain instance of logTest, using the process id (pid)
bunyan logTest.log -c 'this.pid=="1482"'

# Filter on ...  user=bob (if we had that in the log file..)
bunyan -c 'this.user=="bob"' logTest.log


# ERROR level and above
$ bunyan logTest.log -l error

# Watch incoming HTTP requests.
$ tail -f logTest.log | bunyan -c 'this.req'

# Watch outgoing HTTP responses
$ tail -f logTest.log | bunyan -c 'this.res'

# COMBINE: What server errors in HTTP responses.
$ tail -f logTest.log | bunyan -c 'this.res && this.res.statusCode >= 500'


