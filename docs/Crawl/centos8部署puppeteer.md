# centos8部署puppeteer



## 1.安装nodejs

```bash
# 列出提供nodejs软件包的模块
yum module list nodejs

# 安装指定版本的nodejs
sudo yum module install nodejs:14
```



## 2.安装puppeteer

```bash
# 安装cnpm
npm install -g cnpm --registry=https://registry.npm.taobao.org

# 用cnpm安装puppeteer
cnpm install puppeteer
```



## 3.安装依赖

```js
/ index.js

const puppeteer = require('puppeteer');

(async function () {
  	//linux的launch参数必须是这个
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] })
  
  	//打开一个空白页
    const page = await browser.newPage();
  	
  	//跳转页面
    await page.goto('https://www.cnblogs.com/', { waitUntil: 'load' }); 
		
})();
```



这时候如果直接运行`node index.js`会报错

> `Failed to launch the browser process!`



#### 检查确实那些依赖

```bash
ldd node_modules/puppeteer/.local-chromium/linux-722234/chrome-linux/chrome |grep not
```

![image-20211222171325883](https://zwhid.oss-cn-shenzhen.aliyuncs.com/blog/12-22-NxmOhy.png)



缺少的lib库在（[https://pkgs.org/](http://www.zuidaima.com/link.htm?url=https%3A%2F%2Fpkgs.org%2F)）找到并安装

![image-20211222171923299](https://zwhid.oss-cn-shenzhen.aliyuncs.com/blog/12-22-wDY4vt.png)



#### 安装完成后成功运行