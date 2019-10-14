# yarn-macos-pouchdb-error

Repro for [Level/leveldown#686](https://github.com/Level/leveldown/issues/686).

## Instructions

Run `yarn && node index.js` on MacOS. Node version doesn't seem to matter; use 10, 11 or 12.

Don't use npm to install, as it will deduplicate dependencies in such a way that the bug doesn't happen. There must be two versions of `leveldown` in the `node_modules` tree:

```
$ yarn list leveldown
├─ level@5.0.1
│  └─ leveldown@5.3.0
└─ leveldown@5.0.2
```
