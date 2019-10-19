# yarn-macos-pouchdb-error

Repro for [Level/leveldown#686](https://github.com/Level/leveldown/issues/686).

## Instructions

Requires npm >= 6.9, because this uses [package aliases](https://github.com/npm/rfcs/blob/latest/implemented/0001-package-aliases.md) to install multiple versions of `leveldown` side by side. Node version doesn't seem to matter; use 10, 11 or 12.

To install:

```
git checkout low-level
npm install --build-from-source
```

Then run:

```
node index.js 5.3.0 5.0.2
```

Or to test the fix ([Level/leveldown#687](https://github.com/Level/leveldown/pull/687)) or [`-fvisibility=hidden`](https://github.com/Level/leveldown/commit/0969552a9d44e929e93baab1fb938500b89871d0):

```
node index.js ns 5.0.2
node index.js hidden 5.0.2
```
