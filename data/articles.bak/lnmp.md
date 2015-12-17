#LNMP [#linux#](/#linux) [#nginx#](/#nginx) [#mysql#](/#mysql) [#php#](/#php)

## Purpose

#### Separation
数据 程序进行分离开，服务器迁移备份，只需要关注数据

#### Script
统一化脚本，各程序启动，关闭等

#### Upgrade
新版本程序安装，配置不变，测试后，修改配置，可以无缝升级

#### Operations
一个项目，对应一个数据库端口，方便不同项目之间性能监控

#### Multi-version php
多版本并存，不同项目使用不同php版本

#### Flow
了解程序基本运行流程

## Initialization Directory

```
mkdir /kserv \
/kserv/package \
/kserv/app \
/kserv/app/nginx /kserv/app/mysql /kserv/app/php \
/kserv/bin \
/kserv/data \
/kserv/data/nginx /kserv/data/mysql /kserv/data/php \
/kserv/data/nginx/logs
```

## Download

```
cd /kserv/package
curl -O http://nginx.org/download/nginx-1.8.0.tar.gz
curl -O http://cdn.mysql.com/archives/mysql-5.5/mysql-5.5.20-linux2.6-x86_64.tar.gz
curl -O https://downloads.php.net/~ab/php-7.0.0beta2.tar.gz
```
建议先用pan.baidu.com离线下载，然后再下载

## Nginx

添加用户/组
```
groupadd www
useradd -g www www
```

依赖安装
```
yum -y install pcre-devel openssl openssl-devel
```

解压 编译 安装
```
cd /kserv/app/nginx
tar zxvf /kserv/package/nginx-1.8.0.tar.gz
mv nginx-1.8.0 1.8.0

./configure --user=www --group=www --prefix=/kserv/app/nginx/1.8.0

make && make install
```

配置文件
```
cp /kserv/app/nginx/1.8.0/conf/nginx.conf /kserv/data/nginx/nginx.conf
cp /kserv/app/nginx/1.8.0/conf/mime.types /kserv/data/nginx/mime.types
cp /kserv/app/nginx/1.8.0/conf/fastcgi.conf /kserv/data/nginx/fastcgi.conf
```

#### nginx.conf
```
#user www www;

worker_processes 8;

error_log /kserv/data/nginx/logs/error.log;

pid /kserv/data/nginx/nginx.pid;

events {
    use epoll;
    worker_connections 65535;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    access_log  /kserv/data/nginx/logs/access.log;

    sendfile        on;

    keepalive_timeout  65;

    upstream $PHP_CGI_700 {
        server unix:/kserv/data/php/7.0.0/php-fpm.sock;
    }

    server {
        listen       80;
        server_name  localhost;

        root /website;
        index index.html index.htm index.php;

        location ~ \.php$ {
            fastcgi_pass   $PHP_CGI_700;
            fastcgi_index  index.php;
            include        fastcgi.conf;
        }
    }
}
```

#### /kserv/bin/nginx
```
#!/bin/bash

KSERV_PATH='/kserv'

NGINX_VER='1.8.0'

NGINX_APP=$KSERV_PATH'/app/nginx/'$NGINX_VER
NGINX_DATA=$KSERV_PATH'/data/nginx'

NGINX_BIN=$NGINX_APP'/sbin/nginx'
NGINX_CONF=$NGINX_DATA'/nginx.conf'
NGINX_PID=$NGINX_DATA'/nginx.pid'

case "$1" in
    'check')
        $NGINX_BIN -c $NGINX_CONF -t
        ;;
    'start')
        $NGINX_BIN -c $NGINX_CONF
        ;;
    'stop')
        PID=`head $NGINX_PID`
        rm $NGINX_PID
        kill $PID
        ;;
    'reload')
        $NGINX_BIN -c $NGINX_CONF -s reload
        ;;
    *)
        echo 'Usage: '$0' {start|stop|reload|check}';
        exit;
        ;;
esac
```

启动
```
/kserv/bin/nginx start
```

关闭
```
/kserv/bin/nginx stop
```

重新加载
```
/kserv/bin/nginx reload
```

检查nginx.conf是否有错误
```
/kserv/bin/nginx check
```

## MySQL

添加用户/组
```
groupadd mysql
useradd -g mysql mysql
```

解压 权限
```
cd /kserv/app/mysql
tar zxvf /kserv/package/nginxmysql-5.5.20-linux2.6-x86_64.tar.gz
mv mysql-5.5.20-linux2.6-x86_64 5.5.20

chown -R mysql.mysql /kserv/app/mysql /kserv/data/mysql
```

#### /kserv/bin/mysql
```
#!/bin/bash

KSERV_PATH='/kserv'

MYSQL_VER='5.5.20'

MYSQL_PORT=$1

MYSQL_APP=$KSERV_PATH'/app/mysql/'$MYSQL_VER
MYSQL_DATA=$KSERV_PATH'/data/mysql/'$MYSQL_PORT

if [ ! $MYSQL_PORT ] ; then
    echo 'Input port'
    exit
fi;

case "$2" in
    'start')
        cd $MYSQL_APP
        $MYSQL_APP'/bin/mysqld_safe' --defaults-file=$MYSQL_DATA'/mysql.conf' 2>&1>/dev/null &
        ;;
    'stop')
        $MYSQL_APP'/bin/mysqladmin' -uroot -S $MYSQL_DATA'/mysql.sock' shutdown
        ;;
    'create')
        if [ -d $MYSQL_DATA ]; then
            echo $MYSQL_DATA' already exists'
            exit;
        fi
        mkdir $MYSQL_DATA
        $MYSQL_APP/scripts/mysql_install_db --user=$USER --basedir=$MYSQL_APP --datadir=$MYSQL_DATA
        
        echo '[mysqld]' >> $MYSQL_DATA'/mysql.conf'
        echo 'basedir = '$MYSQL_APP >> $MYSQL_DATA'/mysql.conf'
        echo 'datadir = '$MYSQL_DATA >> $MYSQL_DATA'/mysql.conf'
        echo 'plugin-dir = '$MYSQL_APP'/lib/plugin' >> $MYSQL_DATA'/mysql.conf'
        echo 'port = '$MYSQL_PORT >> $MYSQL_DATA'/mysql.conf'
        echo 'socket = mysql.sock' >> $MYSQL_DATA'/mysql.conf'
        echo 'pid-file = mysql.pid' >> $MYSQL_DATA'/mysql.conf'
        echo 'log-error = mysql.err' >> $MYSQL_DATA'/mysql.conf'
        
        chmod 644 $MYSQL_DATA'/mysql.conf'
        ;;
    'manage')
        $MYSQL_APP'/bin/mysql' -uroot -S $MYSQL_DATA'/mysql.sock'
        ;;
    *)
        echo 'Usage: '$0' '$1' {start|stop|create|manage}';
        exit;
        ;;
esac
```

一个项目对应一个数据库端口。便于分离、监控

创建新端口
```
/kserv/bin/mysql 3306 create
```

启动
```
/kserv/bin/mysql 3306 start
```

关闭
```
/kserv/bin/mysql 3306 stop
```

管理
```
/kserv/bin/mysql 3306 manage
```

创建用户/权限
```
insert into mysql.user(Host,User,Password) values("%", "qbless", password("qbless"));
insert into mysql.user(Host,User,Password) values("localhost", "qbless", password("qbless"));
flush privileges;
grant all on *.* to qbless@'%';
grant all on *.* to qbless@'localhost';
flush privileges;
```
ps % 与 localhost 没有交集！！！

导出 && 导入
```
/kserv/app/mysql/5.5.20/bin/mysqldump -h127.0.0.1 -P3306 -uqbless -p -B demo1 demo2 > demo.sql

/kserv/bin/mysql 3306 manage
source demo.sql
```

## PHP

解压 编译 安装
```
cd /kserv/package
tar zxvf /kserv/package/php-7.0.0beta2.tar.gz

cd /kserv/package/php-7.0.0beta2
./configure --prefix=/kserv/app/php/7.0.0 --with-config-file-path=/kserv/data/php/7.0.0 --enable-fpm

make && make install
```

#### Conf

php.ini
```
cp /kserv/package/php-7.0.0beta2/php.ini-development /kserv/data/php/7.0.0/php.ini
```

php-fmp.conf
```
[global]
pid = /kserv/data/php/7.0.0/php-fpm.pid

[www]
user = nobody
group = nobody
listen = /kserv/data/php/7.0.0/php-fpm.sock
listen.owner = www
listen.group = www
pm = dynamic
pm.max_children = 8
pm.start_servers = 2
pm.min_spare_servers = 1
pm.max_spare_servers = 4
```

#### /kserv/bin/php
```
#!/bin/bash

KSERV_PATH='/kserv'

PHP_VER=$1

PHP_APP=$KSERV_PATH'/app/php/'$PHP_VER
PHP_DATA=$KSERV_PATH'/data/php/'$PHP_VER

if [ ! $PHP_VER ] ; then
    echo 'Input version'
    exit
fi;
if [ ! -d $PHP_DATA ] ; then
    echo 'This version('$PHP_VER') does not exist'
    exit
fi;

case "$2" in
    'start')
        $PHP_APP'/sbin/php-fpm' --fpm-config=$PHP_DATA'/php-fpm.conf'
        ;;
    'stop')
        PID=`head $PHP_DATA'/php-fpm.pid'`
        kill -INT $PID
        ;;
    'restart')
        PID=`head $PHP_DATA'/php-fpm.pid'`
        kill -USR2 $PID
        ;;
    *)
        echo 'Usage: '$0' '$1' {start|stop|restart}';
        exit;
        ;;
esac
```

启动
```
/kserv/bin/php 7.0.0 start
```

关闭
```
/kserv/bin/php 7.0.0 stop
```

重启
```
/kserv/bin/php 7.0.0 restart
```

#### Extensions

扩展安装有两种：安装编译、动态编译

`source/php/ext/*` 目录下没有 `config.m4` 的扩展，不建议动态编译，因为各扩展之间有依赖。所以建议使用安装编译

举例安装 gettext
```
cd /kserv/package/php-7.0.0beta2/ext/gettext

/kserv/app/php/7.0.0/bin/phpize

./configure --help | grep gettext

./configure --with-php-config=/kserv/app/php/7.0.0/bin/php-config --with-gettext

make && make install
```
1. 到PHP源码的扩展目录

2. 安装编译

3. 检查该扩展模块安装参数

4. 编译

5. 安装
