# style-loader和less-loader源码

**less-loader**是调用 less 包，把 less 文本编译成 css文本

**style-loader**是返回一段js代码，webpack运行代码后把css文本插入到style标签中

> **最后一个loader(最左边)返回的必须是 js 代码**
>
> 如 file-loader和url-loader.md



### 安装和使用

```bash
npm i style-loader less-loader -D
```

```js
module.exports = {
  // 先去根目录的node_modules找，如果没有，去./loaders找加载器
  resolveLoader:{
    modules:['node_modules',path.join(__dirname,'loaders')]
  },
  module: {
    rules: [{
      test: /\.less/,
      use: [
        'style-loader', //把样式文本变成一个style标签插入到页面中
        'less-loader' //把less编译成CSS
      ]
    }]
  }
}
```

```js
//  ------- index.js ---------- //
import './index.less'
```

```less
//  ------- index.less ---------- //
@color: red;
#root{
  color: @color;
}
```

### less-loader源码

##### ./loaders/less-loader.js

```js
const less = require('less');

function loader(source) {
  // 如果调用了this.async方法,则 webpack 知道 这个 loader 是异步的
  const callback = this.async();
  less.render(source, { filename: this.resource }, (err, output) => {
    callback(err, output.css) // 调用 less，把 less 文本编译成 output.css，也就是css文本
  })
}
module.exports = loader
```

### style-loader源码

##### ./loaders/style-loader.js

```js
function loader(source) {
  const script = `
     let style = document.createElement('style');
     style.innerHTML = ${JSON.stringify(source)};
     document.head.appendChild(style);
   `
  return script
}
module.exports = loader
```
