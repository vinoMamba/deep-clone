## 手写深拷贝

#### 简单理解

`b`是`a`的一份拷贝，`b`中没有对`a`中对象的引用

#### 另一种理解

1. `b`是`a`的一份拷贝
2. 把 `b` 和 `a` 各画一张图，`a`与`b`没有连接

## 方式一: JSON序列化反序列化

```javascript
const a = {
    b: 1,
    c: [1, 2, 3],
    d: {age: 21, name: 'vino'}
}
const a2 = JSON.parse(JSON.stringify(a))
```

#### 缺点

1. 不支持拷贝**函数**、**undefined**、**Date(会转换成ISO8601时间字符串)**、**正则**等等JSON不支持的类型

2. 不支持环状的结构数据(`a.self = a`)

## 递归克隆 























