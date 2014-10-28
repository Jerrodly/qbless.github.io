#[[windows]](/#windows) Free Cloud Server

想要建一个自己的博客。但又不想花钱买服务器，域名。那么就看看以下的步骤吧。

##Download
[wordpress](http://cn.wordpress.org/)

[weiyun](http://www.weiyun.com/download.html)
[baidu yun](http://yun.baidu.com/1t)

[花生壳](http://hsk.oray.com/download/)

##Storage space
开通马化腾微云(QQ号码即可)

安装微云。挂载到某个目录
```
D:\Cloud\Weiyun
```
再用win7自带的mklin进行目录挂载
```
D:

mklink /J Service D:\Cloud\Weiyun\service
```

##Domain & Network

[注册免费域名](https://console.oray.com/domain/free/)

安装运行花生壳，右键免费域名里面的域名(qbless.xicp.net)，点击花生壳管理

勾选开启花生壳映射

添加 (内网IP根据不同的环境，进行修改)
```
应用名称: wordpress
内网IP： 192.168.1.71
内网端口：80
```

##Service

配置nglinx，新增mysql新端口

[Link](/wnmp.html)

解压 wordpress 到 D:\service\wordpress

nglinx.conf
```
    server {
        listen      80;
        server_name qbless.xicp.net;
        root  d:/service/wordpress;
        index index.html index.htm index.php;
        location / {
            index index.html index.php;
            if (-f $request_filename/index.html){
                rewrite (.*) $1/index.html break;
            }
            if (-f $request_filename/index.php){
                rewrite (.*) $1/index.php;
            }
            if (!-f $request_filename){
                rewrite (.*) /index.php;
            }
        }
        location ~ \.php$ {
            fastcgi_pass   php_cgi_53;
            fastcgi_index  index.php;
            include        nginx_fastcgi.conf;
        }
    }
```

新建数据库目录 (D:\Service\mysqld\3307)
```
@echo off

cd d:/service/mysqld/3307/

RunHiddenConsole d:/develop/mysql/5.1.28/bin/mysqld-nt --port=3307 --socket=mysql.sock --pid-file=mysql.pid --datadir=%cd% --console

echo Mysql start OK!
```

启动mysql。启动nginx。

输入申请的免费域名进行安装wordpress。

下一步下一步下一步...