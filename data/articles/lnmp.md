#LNMP [#linux#](/#linux) [#nginx#](/#nginx) [#mysql#](/#mysql) [#php#](/#php)

##Purpose

####separation
数据 程序进行分离开，服务器迁移备份，只需要关注数据

####script
统一化脚本，各程序启动，关闭等

####upgrade
新版本程序安装，配置不变，测试后，修改配置，可以无缝升级

####operations
一个项目，对应一个数据库端口，方便不同项目之间性能监控

####multi-version php
多版本并存，不同项目使用不同php版本

####flow
了解程序基本运行流程

##Initialization directory

```
mkdir /kserv \
/kserv/package \
/kserv/data \
/kserv/data/nginx /kserv/data/mysql /kserv/data/php \
/kserv/data/nginx/logs \
/kserv/nginx /kserv/mysql /kserv/php
```

##Download

```
cd /kserv/package
curl -O http://nginx.org/download/nginx-1.8.0.tar.gz
curl -O http://cdn.mysql.com/archives/mysql-5.5/mysql-5.5.20-linux2.6-x86_64.tar.gz
curl -O https://downloads.php.net/~ab/php-7.0.0beta2.tar.gz
```
建议先用pan.baidu.com离线下载，然后再下载

##Nginx

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
cd /kserv/nginx
tar zxvf /kserv/package/nginx-1.8.0.tar.gz
mv nginx-1.8.0 1.8.0

./configure --user=www --group=www --prefix=/kserv/nginx/1.8.0 --with-http_stub_status_module --with-http_ssl_module

make && make install
```

配置文件
```
cp /kserv/nginx/1.8.0/conf/nginx.conf /kserv/data/nginx/nginx.conf
cp /kserv/nginx/1.8.0/conf/mime.types /kserv/data/nginx/mime.types
cp /kserv/nginx/1.8.0/conf/fastcgi.conf /kserv/data/nginx/fastcgi.conf
```

####nginx.conf
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

    server {
        listen       80;
        server_name  localhost;

        root /website;
        index index.html index.htm index.php;

        location ~ \.php$ {
            fastcgi_pass   unix:/kserv/data/php/7.0.0/php-fpm.sock;
            fastcgi_index  index.php;
            include        fastcgi.conf;
        }
    }
}
```

#### nginx.sh
```
#!/bin/bash

KSERV_PATH='/kserv'

NGINX_VER='1.8.0'

NGINX_PROG=$KSERV_PATH'/nginx/'$NGINX_VER
NGINX_BIN=$NGINX_PROG'/sbin/nginx'
NGINX_DATA=$KSERV_PATH'/data/nginx'
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
/kserv/script/nginx.sh start
```

关闭
```
/kserv/script/nginx.sh stop
```

重新加载
```
/kserv/script/nginx.sh reload
```

检查nginx.conf是否有错误
```
/kserv/script/nginx.sh check
```

##MySQL

添加用户/组
```
groupadd mysql
useradd -g mysql mysql
```

解压 权限
```
cd /kserv/mysql
tar zxvf /kserv/package/nginxmysql-5.5.20-linux2.6-x86_64.tar.gz
mv mysql-5.5.20-linux2.6-x86_64 5.5.20

chown -R mysql.mysql /kserv/mysql /kserv/data/mysql
```

mysql.sh
```
#!/bin/bash

KSERV_PATH='/kserv'

MYSQL_VER='5.5.20'

MYSQL_PORT=$1

MYSQL_PROG=$KSERV_PATH'/mysql/'$MYSQL_VER
MYSQL_DATA=$KSERV_PATH'/data/mysql/'$MYSQL_PORT

if [ ! $MYSQL_PORT ] ; then
    echo 'Input port'
    exit
fi;

case "$2" in
    'start')
        cd $MYSQL_PROG
        $MYSQL_PROG'/bin/mysqld_safe' --defaults-file=$MYSQL_DATA'/mysql.conf' 2>&1>/dev/null &
        ;;
    'stop')
        $MYSQL_PROG'/bin/mysqladmin' -uroot -S $MYSQL_DATA'/mysql.sock' shutdown
        ;;
    'create')
        if [ -d $MYSQL_DATA ]; then
            echo $MYSQL_DATA' already exists'
            exit;
        fi
        mkdir $MYSQL_DATA
        $MYSQL_PROG/scripts/mysql_install_db --user=mysql --basedir=$MYSQL_PROG --datadir=$MYSQL_DATA
        
        echo '[mysqld]' >> $MYSQL_DATA'/mysql.conf'
        echo 'basedir = '$MYSQL_PROG >> $MYSQL_DATA'/mysql.conf'
        echo 'datadir = '$MYSQL_DATA >> $MYSQL_DATA'/mysql.conf'
        echo 'plugin-dir = '$MYSQL_PROG'/lib/plugin' >> $MYSQL_DATA'/mysql.conf'
        echo 'port = '$MYSQL_PORT >> $MYSQL_DATA'/mysql.conf'
        echo 'socket = mysql.sock' >> $MYSQL_DATA'/mysql.conf'
        echo 'pid-file = mysql.pid' >> $MYSQL_DATA'/mysql.conf'
        echo 'log-error = mysql.err' >> $MYSQL_DATA'/mysql.conf'
        
        chmod 644 $MYSQL_DATA'/mysql.conf'
        ;;
    'manage')
        $MYSQL_PROG'/bin/mysql' -uroot -S $MYSQL_DATA'/mysql.sock'
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
/kserv/script/mysql.sh 3306 create
```

启动
```
/kserv/script/mysql.sh 3306 start
```

关闭
```
/kserv/script/mysql.sh 3306 stop
```

管理
```
/kserv/script/mysql.sh 3306 manage
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
/kserv/mysql/5.5.20/bin/mysqldump -h127.0.0.1 -P3306 -uqbless -p -B demo1 demo2 > demo.sql

/kserv/script/mysql.sh 3306 manage
source demo.sql
```

##PHP

解压 编译 安装
```
cd /kserv/package
tar zxvf /kserv/package/php-7.0.0beta2.tar.gz

cd /kserv/package/php-7.0.0beta2
./configure --prefix=/kserv/php/7.0.0 --with-config-file-path=/kserv/data/php/7.0.0 --enable-fpm

make && make install
```

####conf

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
pm.max_children = 5
pm.start_servers = 2
pm.min_spare_servers = 1
pm.max_spare_servers = 3
```

####php.sh
```
#!/bin/bash

KSERV_PATH='/kserv'

PHP_VAR=$1

PHP_PROG=$KSERV_PATH'/php/'$PHP_VAR
PHP_DATA=$KSERV_PATH'/data/php/'$PHP_VAR

if [ ! $PHP_VAR ] ; then
    echo 'Input version'
    exit
fi;

if [ ! -d $PHP_DATA ] ; then
    echo 'This version('$PHP_VAR') does not exist'
    exit
fi;

case "$2" in
    'start')
        $PHP_PROG'/sbin/php-fpm' --fpm-config=$PHP_DATA'/php-fpm.conf'
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
/kserv/script/php.sh 7.0.0 start
```

关闭
```
/kserv/script/php.sh 7.0.0 stop
```

重启
```
/kserv/script/php.sh 7.0.0 restart
```

####extensions

扩展安装有两种：安装编译、动态编译

`source/php/ext/*` 目录下没有 `config.m4` 的扩展，不建议动态编译，因为各扩展之间有依赖。所以建议使用安装编译

举例安装 gettext
```
cd /kserv/package/php-7.0.0beta2/ext/gettext

/kserv/php/7.0.0/bin/phpize

./configure --help | grep gettext

./configure --with-php-config=/kserv/php/7.0.0/bin/php-config --with-gettext

make && make install
```
1. 到PHP源码的扩展目录

2. 安装编译

3. 检查该扩展模块安装参数

4. 编译

5. 安装
