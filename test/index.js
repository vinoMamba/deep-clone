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
        it('能够复制函数', () => {
            const a = function (x, y) {
                return x + y
            }
            a.user = {name: 'vino', age: 21}
            const b = deepClone(a)
            assert(a !== b)
            assert(a.user !== b.user)
            assert(a.user.name === b.user.name)
            assert(a.user.age === b.user.age)
            assert(a(1, 2) === b(1, 2))
        });
        it('能够复制出现环状引用的对象', () => {
            const a = {name: 'vino'}
            a.self = a
            const b = deepClone(a)
            assert(a !== b)
            assert(a.name === b.name)
            assert(a.self !== b.self)
        });
        xit('不会爆栈', () => {
            const a = {child: null}
            let b = a
            for (let i = 0; i < 5000; i++) {
                b.child = {
                    child: null
                }
                b = b.child
            }
            const a2 = deepClone(a)
            assert(a !== a2)
            assert(a.child !== a2.child)
        })
    })
})