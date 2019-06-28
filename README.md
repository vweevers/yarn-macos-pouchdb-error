# yarn-macos-pouchdb-error

Run `yarn && yarn start` on MacOS and get following error:
```
yarn run v1.16.0
$ node index.js
(node:55845) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 destroyed listeners added. Use emitter.setMaxListeners() to increase limit
(node:55845) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 closed listeners added. Use emitter.setMaxListeners() to increase limit
/Users/Tilo/Documents/workspace/test/node_modules/pouchdb/lib/index.js:198
      throw new Error('once called more than once');
      ^

Error: once called more than once
    at /Users/Tilo/Documents/workspace/test/node_modules/pouchdb/lib/index.js:198:13
    at /Users/Tilo/Documents/workspace/test/node_modules/argsarray/index.js:14:18
    at /Users/Tilo/Documents/workspace/test/node_modules/pouchdb/lib/index.js:2439:5
    at /Users/Tilo/Documents/workspace/test/node_modules/pouchdb/lib/index.js:5043:16
    at /Users/Tilo/Documents/workspace/test/node_modules/argsarray/index.js:14:18
    at /Users/Tilo/Documents/workspace/test/node_modules/pouchdb/lib/index.js:5550:11
    at processTicksAndRejections (internal/process/next_tick.js:74:9)
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```
