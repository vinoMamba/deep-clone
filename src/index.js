function deepClone(source) {

    if (source instanceof Object) {
        if (source instanceof Array) {
            const dist = new Array()
            for (let k in source) {
                dist[k] = deepClone(source[k])
            }
            return dist
        } else {
            const dist = new Object()
            for (let k in source) {
                dist[k] = deepClone(source[k])
            }
            return dist
        }
    }
    return source
}

module.exports = deepClone