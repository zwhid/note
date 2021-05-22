# 编写webpack loader





```js
module.exports = {
  module: {
    rules: [{
      test: /\.(jpg|png|gif|bmp)$/,
      use: [{
        loader: 'file-loader',
        options: {
          filename: 
        }
      }]
    }]
  }
}
```

