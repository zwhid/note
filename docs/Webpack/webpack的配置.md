# webpack概述



##  Loader和Plugin的区别?

- Loader直译为`加载器`。Webpack将一切文件视为模块，但是webpack原生是只能解析js文件，如果想将其他文件也打包的话，就会用到loader。 所以Loader的作用是让webpack拥有了加载和解析非JavaScript文件的能力
- Plugin直译为`插件`。Plugin可以扩展webpack的功能，让webpack具有更多的灵活性。 在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果





```js
const path = require('path');
module.exports = {
  mode: 'development',//开发模式不压缩
  devtool: 'none',//不要产出sourcemap文件
  entry: './src/index.js',//默认entry名字就是main
  optimization: {//设置优化选项
    splitChunks: {//分割代码块
      chunks: 'all',
      //automaticNameDelimiter:'~',
      //minSize:10,
      cacheGroups: {//实现缓存
        vendors: {//第三方模块
          //name: 'vendors', 
          chunks: 'initial',//分割代码块的方式，值有3种，async,initial,all
          test: /node_modules/,
          priority: -10
        },
        commons: {//多个页面的共享模块
          //name: 'commons', 
          minSize: 10,//当多个页面共享的代码块大于多少的时候才会抽取出来单独打包
          minChunks: 2,//被几个模块引用的时候会被分离
          priority: -20
        }
      }
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'//main.js
  },
  plugins: []
}
```





## source map的类型

sourcemap是为了解决开发代码与实际运行代码不一致时帮助我们debug到原始开发代码的技术

| 类型                         | 含义                                                         |
| :--------------------------- | :----------------------------------------------------------- |
| source-map                   | 原始代码 最好的sourcemap质量有完整的结果，但是会很慢         |
| eval-source-map              | 原始代码 同样道理，但是最高的质量和最低的性能                |
| cheap-module-eval-source-map | 原始代码（只有行内） 同样道理，但是更高的质量和更低的性能    |
| cheap-eval-source-map        | 转换代码（行内） 每个模块被eval执行，并且sourcemap作为eval的一个dataurl |
| eval                         | 生成代码 每个模块都被eval执行，并且存在@sourceURL,带eval的构建模式能cache SourceMap |
| cheap-source-map             | 转换代码（行内） 生成的sourcemap没有列映射，从loaders生成的sourcemap没有被使用 |
| cheap-module-source-map      | 原始代码（只有行内） 与上面一样除了每行特点的从loader中进行映射 |

- 开发环境使用：cheap-module-eval-source-map
- 生产环境使用：cheap-module-source-map