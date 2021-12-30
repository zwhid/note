

# Mac平台配置JDK



## 1.下载JDK8

https://www.oracle.com/java/technologies/downloads/#java8

<img src="https://zwhid.oss-cn-shenzhen.aliyuncs.com/blog/12-26-ea0KsW.png" alt="截屏2021-12-26 上午11.41.08" style="zoom: 33%;" />

下载完成后直接安装一路next直到完成



## 2.查看JDK安装后的路径

在终端输入命令查看JDK路径

```bash
/usr/libexec/java_home -V
```

<img src="https://zwhid.oss-cn-shenzhen.aliyuncs.com/blog/12-26-LFDxHF.png" alt="截屏2021-12-26 下午1.16.53" style="zoom:33%;" />

## 3.配置JDK环境变量

3.1 编辑`.bash_profile`文件,如果没有会自动创建

```bash
vi ~/.bash_profile
```

3.2 `JAVA_HOME`填上面复制的JDK路径

```bash
JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_271.jdk/Contents/Home
PATH=$JAVA_HOME/bin:$PATH:.
CLASSPATH=$JAVA_HOME/lib/tools.jar:$JAVA_HOME/lib/dt.jar:.
export JAVA_HOME
export PATH
export CLASSPATH
```

按esc,输入:wq保存并退出



3.3 输入以下命令使配置文件生效

```bash
source .bash_profile
```



### 4.验证

输入命令检查环境变量的路径，查看是否配置成功

```bash
echo $JAVA_HOME
```



输入命令，查看JDK的版本信息

```bash
java -version
```

![截屏2021-12-26 下午1.26.01](https://zwhid.oss-cn-shenzhen.aliyuncs.com/blog/12-26-I42sOj.png)