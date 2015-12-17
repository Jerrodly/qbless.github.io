### About

Vagrant是一个基于Ruby的工具，用于创建和部署虚拟化开发环境。它 使用Oracle的开源VirtualBox虚拟化系统，使用 Chef创建自动化虚拟环境。

### Windows

1.安装虚拟机软件(VirtualBox)

https://www.virtualbox.org/

2.安装Vagrant

http://www.vagrantup.com/

3.下载box

http://www.vagrantbox.es/

eg:

```
CentOS7.0 x86_64
VirtualBox
https://dl.dropboxusercontent.com/s/w3lbekm7eunrskm/centos-7.0-x86_64.box
```

4.往vargent里面添加box

```
vagrant box add "centos-7.0-x86_64" centos-7.0-x86_64.box
```

5.到指定目录下初始化，生成一个Vagrantfile

```
cd D:\Develop\lnmp

vagrant init "centos-7.0-x86_64"
```

6.启动

```
vagrant up
```

### ...
to be continued