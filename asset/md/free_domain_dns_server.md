#Free Domain DNS Server [#clutter#](/#clutter)

##Domain
免费提供顶级域名: http://www.dot.tk/zh/index.html?lang=zh

到首页，输入想要注册的 .TK域名
```
qbless.ga
```
->Go

->域名注册

1.把这个域名转发到``http://www.baidu.com``。等申请成功以后。再把修改设置DNS

2.注册长度 12月

3.验证码

4.注册 (这个站点，只能从这个地方注册)

->注册

5.填写邮箱、密码

##DNS
[dnspod](https://www.dnspod.cn/) [360dns](http://www.360dns.com/)

添加域名。输入
```
qbless.ga
```
添加记录
```
主机记录: @
记录类型：A
线路类型：默认
记录值：103.245.222.133 (ping pages.github.com)
```
复制该域名下的
```
f1g1ns1.dnspod.net
f1g1ns2.dnspod.net
```
2个nds服务器地址，到dot.tk -> go to domains 管理里面。
```
Custom DNS

Host Name: 
f1g1ns1.dnspod.net
f1g1ns2.dnspod.net
```
绑定以后。DNS就接入到DNSPOD了

##Server (github)

注册一个帐号
```
Username: qbless


这个username决定你申请的pages.github.com页面的域名
```

创建一个仓库 [New repository](https://github.com/new)
```
Repository name: qbless.github.io


这个仓库必须是 {Username}.github.io
```

到本仓库里面，进行创建第一个页面

https://github.com/{Username}/{Username}.github.io/new/master

or

https://github.com/{Username}/{Username}.github.io -> Create a new file here

```
Name your file…:
index.html

content:
This is my index page.
```

添加 CNAME 文件，将域名绑定到github pages

```
qbless.ga
```

##Wait
十分钟之后，基本上。

域名已经解析到对应的DNS服务器上。

DNS服务器映射域名到某个Github pages服务器上。

Github pages服务器初始生效站点完成。

直接打开TK域名。开始使用了。。。

ps.打开 {Username}.github.io 会发现自动跳转到申请的定级GA域名上。
