# yarn-macos-pouchdb-error

Run `yarn && yarn start` on MacOS and get following error:
```
yarn run v1.16.0
$ node index.js
(node:56044) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 destroyed listeners added. Use emitter.setMaxListeners() to increase limit
(node:56044) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 closed listeners added. Use emitter.setMaxListeners() to increase limit
Ch-Ch-Changes
Ch-Ch-Changes
Ch-Ch-Changes
/Users/Tilo/Documents/workspace/test/node_modules/readable-stream/lib/_stream_transform.js:82
    return this.emit('error', new ERR_MULTIPLE_CALLBACK());
                              ^

Error: Callback called multiple times
    at DestroyableTransform.afterTransform (/Users/Tilo/Documents/workspace/test/node_modules/readable-stream/lib/_stream_transform.js:82:31)
    at onGetWinningDoc (/Users/Tilo/Documents/workspace/test/node_modules/pouchdb/lib/index.js:5829:11)
    at onGetMetadata (/Users/Tilo/Documents/workspace/test/node_modules/pouchdb/lib/index.js:5840:18)
    at /Users/Tilo/Documents/workspace/test/node_modules/pouchdb/lib/index.js:5864:9
    at /Users/Tilo/Documents/workspace/test/node_modules/pouchdb/lib/index.js:4142:9
    at /Users/Tilo/Documents/workspace/test/node_modules/pouchdb/lib/index.js:3973:13
Emitted 'error' event at:
    at DestroyableTransform.onerror (/Users/Tilo/Documents/workspace/test/node_modules/pouchdb/node_modules/readable-stream/lib/_stream_readable.js:558:12)
    at DestroyableTransform.emit (events.js:197:13)
    at DestroyableTransform.afterTransform (/Users/Tilo/Documents/workspace/test/node_modules/readable-stream/lib/_stream_transform.js:82:17)
    at onGetWinningDoc (/Users/Tilo/Documents/workspace/test/node_modules/pouchdb/lib/index.js:5829:11)
    [... lines matching original stack trace ...]
    at /Users/Tilo/Documents/workspace/test/node_modules/pouchdb/lib/index.js:3973:13
```
