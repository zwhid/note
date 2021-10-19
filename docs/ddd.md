



![下载](https://qiniu.zwhid.online/uPic/10-05-4jXNAJ.jpeg)

简易用户的一些 String Number JSON 数据，可使用 electron-json-storage、electron-config。(重新安装APP这里的数据不会丢失)
大量数据，可使用 nedb (JavaScript Database)。





| MT_RECV_NEW_FRIEND_MSG    | 12001 | 批量群发消息               |

| MT_RECV_NEW_FRIEND_MSG    | 12002 | 群发消息上报               |
| MT_RECV_NEW_FRIEND_MSG | 12004 | 终止群发消息 |
| MT_RECV_NEW_FRIEND_MSG  | 12005 | 终止群发消息               |






0失败  1成功  3终止成功















```js
let index = 0,
  customerQueue2: function (userId, taskId, randomTime, conversionId) {
    // insertLog(`进入消费方法,间隔时间: ${randomTime}`)
    // 查询库中得数据进行消费
    let timer = setInterval(() => {
      const msgDate = db.sort({ ctime: 1 }).findOne({ userId, taskId })
      if (!msgDate && !msgDate.length) {
        clearTimeout(timer)
        return
      }
      if (msgDate.intervals >= index) {
        ffiMessage(JSON.stringify(re.data))
        index = 0
      }
      // 
    }, 1000)
  }
```



| MT_BATCH_MSG_RUN             | 12001 | 批量群发消息                               |
| MT_BATCH_MSG_ACCEPT_REP      | 12002 | 群发消息接受成功上报                        |
| MT_BATCH_MSG_EXCEPTION_REP   | 12003 | 群发消息异常单个上报                        |
| MT_ABORT_BATCH_MSG           | 12004 | 终止群发消息                               |
| MT_ABORT_BATCH_MSG_DONE_REP  | 12005 | 终止群发消息完成上报                        |



```js
function commitSuicide () {
    cmdFindPidList('WXWork.exe', (pids) => {
      insertLog(`清除在线企微个数：${pids.length}`)
      // 异步计数器，每次执行减一，为零时执行callback
      const counter = (conut, callback) => () => {
        --conut === 0 && callback()
      }
      const killDone = counter(pids.length, () => {
        insertLog(`在线企微清除完成，退出小助手`)
        process.exit()
      })
      pids.forEach(pid => {
        killPid(pid, err => {
          if (err) {
            insertLog(`小助手准备下线,清除在线企微${pid}失败`)
          }
          insertLog(`小助手准备下线,清除在线企微${pid}成功`)
          killDone()
        })
      })
      
    })
}
```