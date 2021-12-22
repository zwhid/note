## Promise实现原理

点then链式调用内部的实现，返回全新的promise，递归

## Node的事件环

## 微任务和宏任务的区别

## node中的微任务有哪些

## 子进程的用法

```js
const { spawn } = require('child_process');

export function configCopy(srcPath, destPath, callback) {

  let child = spawn('node', ['./copyFile', srcPath, destPath])

  child.stdout.pipe(process.stdout)
  child.stderr.pipe(process.stderr)
  child.on('close', function () {
    callback()
  });
  child.on('error', function () {
    insertLog(`复制用户 ${userId} 的配置文件失败: ERR, ${ err }`);
  });
}
```

```js
const exec = require('child_process').exec

exec('taskkill -f  /pid ' + pid, (error, stdout, stderr) => {
    callbackFun(error);
})
```

