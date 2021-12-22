​        

```js
Unaccepted => getSmsMessagePage => data: 'notReceived',

Processing => getSmsMessagePage => data: 'inhand',

AcceptedErr => getSmsMessagePage => data: 'error',

Unchecked => getSmsMessagePage => data去掉, search => checkStatus: 'unchecked',
  
SendRecord => getSmsMessagePage => status: 'send',
```

