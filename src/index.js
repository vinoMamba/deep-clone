const cache = []

function deepClone(source) {
    if (source instanceof Object) {
        const distCache = findCache(source)
        if (distCache) {
            return distCache
        } else {
            let dist
            if (source instanceof Array) {
                dist = new Array()
            } else if (source instanceof Function) {
                dist = function () {
                    return source.apply(this, arguments)
                }
            } else {
                dist = new Object()
            }
            cache.push([source, dist])
            for (let k in source) {
                dist[k] = deepClone(source[k])
            }
            return dist
        }
    }
    return source
}

function findCache(source) {
    for (let i = 0; i < cache.length; i++) {
        if (cache[i][0] === source) {
            return cache[i][1]
        }
    }
    return undefined
}

module.exports = deepClone