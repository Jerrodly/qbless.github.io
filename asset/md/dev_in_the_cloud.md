#[[tool]](/#tool) Developing in the cloud

## Preface

代码托管烦琐。

换机子了~ 重新安装LNMP，重新安装Svn/Git客户端，IDE重新安装设置...

多处工作站，增加修改同步繁琐。

## Register

https://coding.net/register


## Project

https://coding.net/user/projects/create

## WebIDE

代码(左侧)->WebIDE
or
https://coding.net/ide?ownerName={username}&projectName={yourProjectName}

##Terminal
菜单->Tools->New Terminal

##LNMP
```
sudo su

cd /home/coding

apt-get install screen

screen -S lnmp

wget -c http://soft.vpser.net/lnmp/lnmp1.1-full.tar.gz

tar zxf lnmp1.1-full.tar.gz

cd lnmp1.1-full

./ubuntu.sh
```

##Nginx Server

```
cd /usr/local/nginx/conf/

vi nginx.conf

user www www; -> #user www www; //注释用户

mkdir vhost

vim box.myide.io.conf

server {
     listen 80;
     server_name ~^(.+)?\.box\.myide\.io$;

     root /home/coding/workspace/;
     index index.htm index.html index.php;

     access_log /home/wwwlogs/box.myide.io.log access;

     location ~\.php$ {
         fastcgi_pass unix:/tmp/php-cgi.sock;
         fastcgi_index index.php;
         include fastcgi.conf;
     }
}

killall -9 nginx

/root/lnmp restart
```

####PS.

感谢Coding(https://coding.net/)提供完整的开发服务~