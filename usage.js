var HookedCacheMap = require('./index.js')
var cache = new HookedCacheMap()

cache.set(27, 'fraud', 419) // time-to-live, key, value

console.log(cache, cache.size)

setTimeout(function () {
  console.log(cache, cache.size) // will be empty
}, 28)
