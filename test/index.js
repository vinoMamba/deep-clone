const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.use(sinonChai)

const assert = chai.assert
const deepClone = require('../src/index')

describe('deepClone', () => {
    describe('1.基本', () => {
        it('是一个函数', () => {
            assert.isFunction(deepClone)
        });
        it('能够复制基本类型', () => {
            const n = 123
            const n2 = deepClone(n)
            assert(n === n2)
            const string = '12345'
            const s2 = deepClone(string)
            assert(string === s2)
            const b = true
            const b2 = deepClone(b)
            assert(b === b2)
            const null1 = null
            const null2 = deepClone(null1)
            assert(null1 === null2)
            const u = undefined
            const u2 = deepClone(u)
            assert(u === u2)
            const sym = Symbol()
            const sym1 = deepClone(sym)
            assert(sym === sym1)
        });
    })
    describe('2.对象', () => {
        it('能够复制普通对象', () => {
            const a = {name: 'vino', age: 18, child: {name: 'vin'}}
            const b = deepClone(a)
            assert(a !== b)
            assert(a.name === b.name)
            assert(a.age === b.age)
            assert(a.child !== b.child)
            assert(a.child.name === b.child.name)
        });
        it('能够复制数组对象', () => {
            const a = [[1, 23], [2, 3, 4]]
            const b = deepClone(a)
            assert(a !== b)
            assert(a[0] !== b[0])
            assert(a[1] !== b[1])
            assert.deepEqual(a, b)
        });
    })
})