const tape = require('tape')
const HookedCacheMap = require('./index')

tape('self-clearing', t => {
  const cache = new HookedCacheMap()
  cache.set(1000, 'fraud', 419)
  t.is(cache.size, 1, 'kv set')
  setTimeout(() => {
    t.is(cache.size, 0, 'empty')
    t.end()
  }, 1001)
})

tape('feeding 2d arr at initialisation', t => {
  const cache = new HookedCacheMap(419, [ [ 'fraud', 419 ], [ 'a', 1 ] ])
  t.is(cache.size, 2, 'got two on it')
  t.is(cache.get('fraud'), 419, 'correct value')
  t.is(cache.get('a'), 1, 'correct value')
  setTimeout(() => {
    t.is(cache.size, 0, 'empty')
    t.end()
  }, 420)
})

tape('willDelete cleanup hook', t => {
  t.plan(5)
  const cache = new HookedCacheMap()
  cache.set(436, 'fraud', 419, (key, value, doDelete) => {
    t.is(key, 'fraud', 'got the key passed to the willDelete hook')
    t.is(value, 419, 'got the value passed to the willDelete hook')
    t.is(cache.size, 1, 'size 1 in willDelete hook')
    t.true(cache.has('fraud'), 'has "fraud" in willDelete hook')
    doDelete()
  })
  setTimeout(() => {
    t.is(cache.size, 0, 'size 0 once ttl exceeded')
  }, 444)
})
