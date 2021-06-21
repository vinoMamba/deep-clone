function deepClone(source) {

    if (source instanceof Object) {
        const dist = new Object()
        for (let k in source) {
            //递归
            dist[k] = deepClone(source[k])
        }
        return dist
    }
    return source
}

module.exports = deepClone