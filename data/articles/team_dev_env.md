### Preface

#### Problem

0. 操作系统 (Windows / Mac OS / Ubuntu)

1. 程序版本差异 (nmp vs amp) || php(5.2 vs 5.3 vs 7.0) || mysql(4.x vs 5.x)

2. 各程序脚本(启动/关闭/重启)、程序配置 混乱不统一，升级相对繁琐

3. 新人甚至只知道几个名词、只会搜索、只会下一步

4. 我跑没问题啊！！！ 你扯淡吧~~~

5. 程序能跑就行！！！ 懒得折腾~~~

#### Purpose

0. 帮助了解各程序间依赖关系，运行机制

1. 解放个人电脑使用开发环境带来的资源消耗

2. 让使用更简单、方便

3. 统一 开发、测试、生产 环境的差异性

### OP

#### 申请一台大内存大空间的开发机

#### 最小化安装 CentOS

#### 修改 Host Name，便于区分机器

```
hostname 192.168.*.*
vi /etc/sysconfig/network
```

#### 配置SSH

```
vi /etc/hosts.deny
/etc/rc.d/init.d/sshd restart
```

#### Tools

```
yum install svn
yum install git
yum install vim
```

#### Samba

```
yum install samba
cd /etc/samba
mv smb.conf smb.conf.bak
vi smb.conf

[global]
        workgroup = WORKGROUP
        server string = Samba Server

        username map = /etc/samba/smbusers

        unix password sync = yes
        passdb backend = smbpasswd
        smb passwd file = /etc/samba/smbpasswd
[homes]
        comment = Home Directories
        writable = yes
        browseable = no

vi /etc/samba/smbusers

qbless = qbless
```

将Linux与Windows || Mac OS 打通目录共享

#### 给团队成员添加账号，建议使用员工姓名拼音，重复追加数字编号

```
groupadd qbless
useradd -g qbless qbless
echo qbless:qbless | chpasswd
smbpasswd -a qbless
```

#### 分配端口，每人100个，总区间：8000-9999。超过20人加新机器

```
find /home -maxdepth 2 -name "limit_*"
echo 'Please observe' > /home/qbless/limit_port-8000-8099
```

#### 离职，回收账号跟端口

```
echo qbless: | chpasswd
smbpasswd -n qbless
mv /home/qbless/limit_port-8000-8099 /home/qbless/unlimited_port-8000-8099
```

### RD

#### 修改密码

```
passwd
```

#### 检查端口

```
netstat -anlp | grep :80
```

#### install (nginx/mysql/php)

[lnmp](/lnmp)

#### 创建目录

```
├── app
│   ├── mysql
│   ├── nginx
│   └── php
├── bin
├── data
│   ├── mysql
│   ├── nginx
│   └── php
└── htdocs
└── workspace
```

#### USAGE

```
~/bin/nginx start
~/bin/mysql 3306 start
~/bin/php 7.0.0 start
```

#### NGINX

~/bin/nginx

```
NGINX_VER='1.9.6'

NGINX_APP=$HOME'/app/nginx/'$NGINX_VER
NGINX_DATA=$HOME'/data/nginx'
```

#### MYSQL

~/bin/mysql

```
MYSQL_VER='5.7.9'

MYSQL_APP=$HOME'/app/mysql/'$MYSQL_VER
MYSQL_DATA=$HOME'/data/mysql/'$MYSQL_PORT
```

#### PHP

~/bin/php

```
PHP_VER=$1

PHP_APP=$HOME'/app/php/'$PHP_VER
PHP_DATA=$HOME'/data/php/'$PHP_VER
```

### Working

Windows 右键 -> 添加网络位置 -> \\192.168.*.*\qbless -> Sublime Text (Project Path) -> Coding
