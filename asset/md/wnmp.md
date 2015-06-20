#WNMP MongoDB Redis [#windows#](/#windows)

##Data
用于分离配置文件，日志，数据存储。

先在创建
```
D:\Develop\data
```

然后在这个目录下依次创建 
```
command(命令) 
config(配置) 
log(日志) 
mongod(数据目录) 
mysqld(数据目录) 
redisd(数据目录) 
temp(临时文件目录)
```

##Nginx
下载任意版本安装 http://nginx.org/download/

解压到
```
D:\Develop\nginx\1.5.6
```

复制文件
```
fastcgi.conf, mime.types
->
D:\Develop\data\config

D:\Develop\nginx\1.5.6\temp
->
D:\Develop\data\temp
```

修改文件名
```
fastcgi.conf
->
nginx_fastcgi.conf

mime.types
->
nginx_mime.types
```

创建目录(用于存放nginx日志)
```
D:\Develop\data\log\nginx
```

创建nginx.conf
```
#user  nobody;
worker_processes  8;
worker_rlimit_nofile 65535;

error_log  log/nginx/error.log;

pid        temp/nginx.pid;

events {
    worker_connections  10240;
}

http {
    include       nginx_mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  log/nginx/access.log  main;

    sendfile        on;

    keepalive_timeout  600;

    upstream php_cgi_53 {
        server 127.0.0.1:9530;
        server 127.0.0.1:9531;
        server 127.0.0.1:9532;
        server 127.0.0.1:9533;
    }

    server {
        listen      80;
        server_name localhost;

        root  D:/Develop/website/www;
        index index.html index.htm index.php;

        location ~ \.php$ {
            fastcgi_pass   php_cgi_53;
            fastcgi_index  index.php;
            include        nginx_fastcgi.conf;
        }
    }
}

ps. 
line29: upstream php_cgi_53
line43: location ~ \.php$
如果不需要php可以进行注释 (#)
```

创建启动脚本：
D:\Develop\data\command\nginx_start.bat
```
@echo off

cd d:/develop/data/

RunHiddenConsole d:/develop/nginx/1.5.6/nginx -c config/nginx.conf

echo Nginx start OK!
```

创建结束脚本：
D:\Develop\data\command\nginx_stop.bat
```
@echo off

ps -k nginx.exe

echo Nginx stop OK!
```



##PHP
下载任意版本安装包 http://us2.php.net/downloads.php

解压
```
D:\Develop\php\5.3.27
```

复制 && 重命名
```
php.ini-development->php.ini
```

然后打开文件 && 搜索
```
;cgi.fix_pathinfo=1

ps:
Windows Extensions根据自己的需求开启(去掉 ;extension= 前面的;即可)
```
去掉前面 ; 让php支持cgi模式


创建启动脚本：
D:\Develop\data\command\php_start.bat
```
@echo off

cd d:/develop/php/5.3.27/

RunHiddenConsole php-cgi -b 127.0.0.1:9530 -c php.ini
RunHiddenConsole php-cgi -b 127.0.0.1:9531 -c php.ini
RunHiddenConsole php-cgi -b 127.0.0.1:9532 -c php.ini
RunHiddenConsole php-cgi -b 127.0.0.1:9533 -c php.ini

echo PHP start OK!
```

创建结束脚本：
D:\Develop\data\command\php_stop.bat
```
@echo off

ps -k php-cgi.exe

echo PHP stop OK!
```

##Mysql
下载任意版本安装包(zip) http://dev.mysql.com/downloads/mysql/

解压
```
D:\Develop\mysql\5.1.28
```

在
```
D:\Develop\data\mysqld
```
目录下创建 3306 目录，即端口

然后拷贝到当前目录
```
D:\Develop\mysql\5.1.28\data\mysql
->
D:\Develop\data\mysqld\3306\mysql
```

创建启动脚本：
D:\Develop\data\command\mysql_start.bat
```
@echo off

cd d:/develop/data/mysqld/3306/

RunHiddenConsole d:/develop/mysql/5.1.28/bin/mysqld-nt --port=3306 --socket=mysql.sock --pid-file=mysql.pid --datadir=%cd% --console

echo Mysql start OK!
```

创建结束脚本：
D:\Develop\data\command\mysql_stop.bat
```
@echo off

ps -k mysqld-nt.exe

echo Mysql stop OK!
```

##MongoDB
下载任意安装包 http://www.mongodb.org/downloads

解压
```
D:\Develop\mongo\2.2.2
```

创建目录(日志)
```
D:\Develop\data\log\mongo
```

创建目录(数据)
```
D:\Develop\data\mongod\27017
```

创建启动脚本：
D:\Develop\data\command\mongo_start.bat
```
@echo off

cd d:/develop/data/

RunHiddenConsole d:/develop/mongo/2.2.2/bin/mongod --dbpath=mongod/27017/ --logpath=log/mongo/27017.log

echo Mongo start OK!
```

创建结束脚本：
D:\Develop\data\command\mongo_stop.bat
```
@echo off

ps -k mongod.exe

echo Mongo stop OK!
```

##Redis
下载安装包 https://github.com/MSOpenTech/redis

将压缩包里面的
```
\bin\release\redisbin64.zip
```
解压到
```
D:\Develop\redis\2.4.5
```

复制 && 重命名
```
redis.conf
->
D:\Develop\data\config\redis_6379.conf
```

创建启动脚本：
D:\Develop\data\command\redis_start.bat
```
@echo off

cd d:/develop/data/

RunHiddenConsole d:/develop/redis/2.4.5/redis-server config/redis_6379.conf

echo Redis start OK!
```

创建结束脚本：
D:\Develop\data\command\redis_stop.bat
```
@echo off

ps -k redis-server.exe

echo Redis stop OK!
```

#PS
[RunHiddenConsole.exe](https://www.google.com.hk/search?q=RunHiddenConsole)
[PS.exe](https://www.google.com.hk/search?q=windows+ps+command)
