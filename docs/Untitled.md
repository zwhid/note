```js
    readExcel(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = e => {
          const getPhone = (str) => {
            const arr = String(str).match(/1\d{10}/g)
            return isArray(arr) ? arr.map(v=>Number(v)) : null
          }
          const data = e.target.result
          const workbook = XLSX.read(data, { type: 'array' })
          const firstSheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[firstSheetName]
          const sheetJson = XLSX.utils.sheet_to_json(worksheet)
          const results = []
          sheetJson.forEach(row => {
            for (const key in row) {
              if (getPhone(key)) {
                results.push(...getPhone(key))
              }
              if (getPhone(row[key])) {
                results.push(...getPhone(row[key]))
              }
            }
          })
          resolve(results)
        }
        reader.readAsArrayBuffer(file)
      })
    },
```





​        

```js

Unaccepted => getSmsMessagePage => data: 'notReceived',

Processing => getSmsMessagePage => data: 'inhand',

AcceptedErr => getSmsMessagePage => data: 'error',

Unchecked => search => checkStatus: 'unchecked',
  
  
SendRecord => getSmsMessagePage => status: 'send',

```



https://onedrive.live.com?invref=6dcd2fc01ade2f77&invscr=90
