# Rollup基本配置



## 1.安装依赖库

```bash
npm i rollup @babel/core @babel/preset-env rollup-plugin-babel -D
```


- rollup：rollup核心库
- @babel/core：babel核心库，把 js 代码分析成 ast
- @babel/preset-env：把es6代码转成es5代码
- rollup-plugin-babel：在 rollup 上使用 babel 的插件



## 2.babel 默认配置文件

在根目录创建`.babelrc`文件

```json
{
  "presets": [
    "@babel/preset-env"
  ]
}
```



## 3.rollup 默认配置文件

在根目录创建`rollup.config.js`文件，在全局执行 "rollup -c" 指令时会采用这个默认文件进行打包

```js
import babel from 'rollup-plugin-babel'
export default {
  input: './src/index.js', // 入口文件
  output: {
    format: 'umd', // 出口文件规范。umd = amd + commonjs + window.Vue
    name: 'Vue',
    file: 'dist/vue.js', // 出口文件
    sourcemap: true // 源码映射，报错时可以根据es5代码找到es6源代码
  },
  plugins: [
    babel({ // 应用 babel 转义。默认采用 .babelrc 配置
      exclude: 'node_modules/**'
    })
  ]
}
```



#### 最终文件结构

```bash
.
├── dist
│   ├── vue.js
│   └── vue.js.map
├── package.json
├── rollup.config.js
├── .babelrc
└── src
    └── index.js
```



## 4.测试打包

创建`/src/index.js`测试代码

```js
let a = 12;

console.log(a);

export default a;
```



在`package.json`添加一条 scripts，方便代码执行

- -c：config，采用`rollup.config.js`默认配置
- -w：watch，监控代码变化，实时打包

```json
"scripts": {
  "serve": "rollup -c -w"
}
```





#### 打包后的结果

```js
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

	var a = 12;
	console.log(a);

	return a;

})));
```

