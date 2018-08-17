class HookedTtlMap extends Map {

  constructor (ttl, iterable, hook) {
    super()
    if (iterable && hook)
      iterable.forEach(kv => this.set(ttl, kv[0], kv[1], hook), this)
    else if (iterable)
      iterable.forEach(kv => this.set(ttl, kv[0], kv[1]), this)
  }

  set (ttl, key, value, hook) {
    if (typeof hook !== 'function') hook = (k, v, doDelete) => doDelete()

    const doDelete = () => super.delete(key)
    const willDelete = hook.bind(this, key, value, doDelete)

    super.set(key, value)

    const timeout = setTimeout(willDelete, ttl)
    if (timeout.unref) timeout.unref()

    return this
  }

}

module.exports = HookedTtlMap
