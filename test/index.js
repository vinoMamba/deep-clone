const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.use(sinonChai)

const assert = chai.assert
const DeepClone = require('../src/index')

describe('deepClone', () => {
    describe('1.基本', () => {
        it('是一个函数', () => {
            assert.isFunction(new DeepClone().clone)
        });
        it('能够复制基本类型', () => {
            const n = 123
            const n2 = new DeepClone().clone(n)
            assert(n === n2)
            const string = '12345'
            const s2 = new DeepClone().clone(string)
            assert(string === s2)
            const b = true
            const b2 = new DeepClone().clone(b)
            assert(b === b2)
            const null1 = null
            const null2 = new DeepClone().clone(null1)
            assert(null1 === null2)
            const u = undefined
            const u2 = new DeepClone().clone(u)
            assert(u === u2)
            const sym = Symbol()
            const sym1 = new DeepClone().clone(sym)
            assert(sym === sym1)
        });
    })
    describe('2.对象', () => {
        it('能够复制普通对象', () => {
            const a = {name: 'vino', age: 18, child: {name: 'vin'}}
            const b = new DeepClone().clone(a)
            assert(a !== b)
            assert(a.name === b.name)
            assert(a.age === b.age)
            assert(a.child !== b.child)
            assert(a.child.name === b.child.name)
        });
        it('能够复制数组对象', () => {
            const a = [[1, 23], [2, 3, 4]]
            const b = new DeepClone().clone(a)
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
            const b = new DeepClone().clone(a)
            assert(a !== b)
            assert(a.user !== b.user)
            assert(a.user.name === b.user.name)
            assert(a.user.age === b.user.age)
            assert(a(1, 2) === b(1, 2))
        });
        it('能够复制出现环状引用的对象', () => {
            const a = {name: 'vino'}
            a.self = a
            const b = new DeepClone().clone(a)
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
            const a2 = new DeepClone().clone(a)
            assert(a !== a2)
            assert(a.child !== a2.child)
        })
        it('可以复制正则表达式', () => {
            const a = /hi\d+/gi
            const a2 = new DeepClone().clone(a)
            assert(a.source === a2.source)
            assert(a.flags === a2.flags)
            assert(a !== a2)
        });
        it('可以复制日期', () => {
            const a = new Date()
            const a2 = new DeepClone().clone(a)
            assert(a !== a2)
            assert(a.getTime() === a2.getTime())
        });
        it('自动跳过原型属性', () => {
            const a = Object.create({name: 'vino'})
            a.xxx = {yyy: {zzz: '1'}}
            const b = new DeepClone().clone(a)
            assert(a !== b)
            assert.isFalse('name ' in b)
            assert(a.xxx.yyy.zzz === b.xxx.yyy.zzz)
            assert(a.xxx !== b.xxx)
        })
        it('很复杂的对象', () => {
            const a = {
                n: NaN,
                s: '',
                n2: Infinity,
                null: null,
                u: undefined,
                sym: Symbol(),
                o: {
                    n: NaN,
                    s: '',
                    n2: Infinity,
                    null: null,
                    u: undefined,
                    sym: Symbol(),
                },
                array: [
                    {
                        n: NaN,
                        s: '',
                        n2: Infinity,
                        null: null,
                        u: undefined,
                        sym: Symbol(),
                    }
                ],
                fn: function () {
                    return 'f1'
                },
                date: new Date(),
                reg: /test/gi
            }
            const b = new DeepClone().clone(a)
            assert(a !== b)
            assert.isNaN(b.n)
            assert(a.s === b.s)
            assert(a.n2 === b.n2)
            assert(a.null === b.null)
            assert(a.u === b.u)
            assert(a.sym === b.sym)
            assert(a.o !== b.o)
            assert.isNaN(b.o.n)
            assert(a.o.s === b.o.s)
            assert(a.o.n2 === b.o.n2)
            assert(a.o.null === b.o.null)
            assert(a.o.u === b.o.u)
            assert(a.o.sym === b.o.sym)
            assert(a.array !== b.array)
            assert.isNaN(a.array[0].n)
            assert(a.array[0].s === b.array[0].s)
            assert(a.array[0].n2 === b.array[0].n2)
            assert(a.array[0].null === b.array[0].null)
            assert(a.array[0].u === b.array[0].u)
            assert(a.array[0].sym === b.array[0].sym)
            assert(a.fn !== b.fn)
            assert(a.fn() === b.fn())
            assert(a.date !== b.date)
            assert(a.date.getTime() === b.date.getTime())
            assert(a.reg !== b.reg)
            assert(a.reg.flags === b.reg.flags)
            assert(a.reg.source === b.reg.source)
        });
    })
})