# hooked-cache-map

[![build status](http://img.shields.io/travis/chiefbiiko/hooked-cache-map.svg?style=flat)](http://travis-ci.org/chiefbiiko/hooked-cache-map) [![AppVeyor Build Status](https://ci.appveyor.com/api/projects/status/github/chiefbiiko/hooked-cache-map?branch=master&svg=true)](https://ci.appveyor.com/project/chiefbiiko/hooked-cache-map)

***

A `Map` subtype to be used as a temporary cache allowing for cleanup operations before any item is deleted from the map through a `willDelete` hook.

***

## Get it!

```
npm install --save hooked-cache-map
```

***

## Usage

``` js
var HookedCacheMap = require('hooked-cache-map')
var cache = new HookedCacheMap()

cache.set(27, 'fraud', 419) // time-to-live, key, value

console.log(cache, cache.size)

setTimeout(function () {
  console.log(cache, cache.size) // will be empty
}, 28)
```

***

## API

### `var cache = new HookedCacheMap([ttl, iterable][, willDelete(key, value, doDelete)])`

Create a new `HookedCacheMap` instance. If `iterable` is provided (must be a 2d array) all passed items get added to the map during instantiation, and deleted after `ttl`. If `willDelete` is a function it will be called as a cleanup hook before items are deleted from the set but after `ttl` has exceeded. Make sure to call the `doDelete` callback at the end of the `willDelete` hook to actually perform the deletion.

### `cache.set(ttl, key, value[, willDelete(key, value, doDelete)])`

Provide `ttl`, time to live in ms, a `key`, and a `value` that will get deleted from the map at the end of their lifetime. If the last argument is a function it will be called as a cleanup hook before valules are deleted from the map but after `ttl` has exceeded. Make sure to call the `doDelete` callback at the end of the `willDelete` hook to actually perform the deletion.

***

## License

[MIT](./license.md)
