# AnyMotion

💫 函数式、响应式的轻量级 JavaScript 动画库

## 📦 安装

```sh
$ npm install -g anymotion
```

## 🎯 使用

### 快速开始

```js
import { spring } from 'anymotion'

spring({ from: 0, to: 100 }).start(value => console.log('update: ', value))
```

### 弹簧动画

弹簧动画通过模拟现实弹性运动，可以通过直观的配置呈现非常自然的动画效果。

#### 传入的值

单纯地传入一个数字：

```js
spring({ from: 0, to: 100 })
```

或者是一个字符串，即使它很复杂:

```js
spring({ from: '0px', to: '100px' })
spring({ from: '#fff', to: '#000' })
spring({ from: '0px 0px 0px rgba(0, 0, 0, 0)', to: '10px 10px 0px rgba(0, 0, 0, 0.2)' })
```

如有必要，也可以将对象或数组整个传入:

```js
spring({
  from: { width: 0, boxShadow: '0px 0px 0px rgba(0, 0, 0, 0)' },
  to: { width: 100, boxShadow: '10px 10px 0px rgba(0, 0, 0, 0.2)' },
})

spring({
  from: [0, 0, 0, 'linear-gradient(#e66465, #9198e5)'],
  to: [10, 10, 20, 'linear-gradient(#9198e5, #e66465)'],
})
```

总之，用你偏好的任何方式组织并传入你想使之动起来的值，然后启动动画并监听它的变化。

#### 配置

想象运动的元素是被一根弹簧赋予动力，调整这些配置，让它呈现出不同的动画效果：

```js
spring({ from: 0, to: 100, config: { tension: 170, friction: 26, mass: 1, precision: 0.01 } })
```

#### 监听函数

默认情况下，直接调用 start 并传入一个函数，他会在值更新时被调用：

```js
spring({ from: 0, to: 100 }).start(value => console.log('update: ', value))
```

也可以传入一个对象，分别监听 `update` 与 `complete` 事件，`complete` 会在动画结束时调用：

```js
spring({ from: 0, to: 100 }).start({
  update: value => console.log('update: ', value),
  complete: () => console.log('complete'),
})
```

#### 管道

与 `RxJS` 相似，你可以在 `pipe` 中去操作响应的值，经过处理后的值最终会输出到 `update` 监听函数中：

```js
import { filter } from 'anymotion/operators/filter'
import { map } from 'anymotion/operators/map'

spring({ from: 0, to: 100 })
  .pipe(
    filter(v => v > 50),
    map(v => v + 100)
  )
  .start(value => console.log('update: ', value)) // range 150 ~ 200
```

#### 停止动画

调用 `start` 后你可以得到一个 `playback`，通过它手动停止当前动画：

```js
const playback = spring({ from: 0, to: 100 }).start()

playback.stop()
```