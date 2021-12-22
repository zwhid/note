# 安装nvm



## 安装步骤

```bash
# 安装工具 wget
apt-get install wget -y

# 用 wget 安装 nvm
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash

# 环境变量生效
source ~/.bashrc

# 用 nvm 安装 node v12.14.1 版本
nvm install 12.14.1

# 查看是否安装成功
node -v

# 用 npm 安装 cnpm
npm i cnpm -g
```



## 遇到的问题

用 wget 安装 nvm，没有任何响应

```bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
```



用 curl 安装，返回443连接拒绝，但443是开了的

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
```

```bash
curl: (7) Failed to connect to raw.githubusercontent.com port 443: Connection refused
```



后台ping了一下`raw.githubusercontent.com`，找不到IP地址，在 hosts 手动设置域名解析解决

```bash
vim /etc/hosts

199.232.68.133 raw.githubusercontent.com
```

