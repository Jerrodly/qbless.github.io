#Web Architecture [#web#](/#web)

## MVC

Browser -> Server(Nginx | Apache) -> PHP

-> Router -> Dispatcher -> Controller

-> Model -> Controller

-> View -> Controller

-> Server -> Browser

传统的MVC，以Controller为核心，与Model、View进行双向通信。但Model与View之间不通信。

## Page Output

0. Static 最早的静态页面。也是现在企业站万年不维护的几个页面喜欢采用的方式。

1. PHP Echo 引入动态语言后，直接在脚本上进行输出。现在这个只存在与临时工的项目里。

2. PHP Smarty 引入了统一的模版管理后，模版统一存放了，也有利于维护了。但Smarty语法限制，性能问题。 这货是现在主流的页面输出方式。

3. 还有其他的方式吗？

## Question

在目前的架构模式中，MVC中View越来越厚重，发现可以做的事情越来越多。

用户体验要好，渲染速度块，浏览器性能要省...

各种需求层出不穷，这些也都要PHP Programmer来做吗？

如果有人接手了，他们要做些什么？

如果PHP Programmer不涉及前端了，我们还做些什么？

## Front-end

#### Dismantling

CSS 样式 (base、head、foot、top ...)

Widget 挂件 (alert、confirm、login ...)

Util 工具

#### Template compile

[Micro-Templating](http://ejohn.org/blog/javascript-micro-templating/)

[VuaJs](http://vuejs.org/)

[NodeJS](http://nodejs.org/)

模版的编译。由前端JS在客户端进行处理。

不再由笨重的Smarty处理，节省了服务端性能开销。

#### User input

Event 事件处理

Guide 用户引导

Verification 数据校验

用户输入由前端进行效果渲染，光标定位等等，提高体验

减少服务端请求数量，节省服务端性能开销。

#### Responsive

现在的设备越来越多。不同的PC分辨率不同，不同的设备分辨率不同。

需要一个自适用的方案解决。

#### Revision

要改版了。不用找后端程序员，直接由前端程序员进行新版本开发，调用相同接口。即可。

#### Build Forge

自动化构建

css压缩、js压缩规则

#### ...

## Back-end

#### Config

减少硬编码

开关可配置化

逻辑可配置化

#### RESTful API

目前比较成熟的一套互联网应用程序的API设计理论

管理管理前端、移动端、PC端等各端接口

#### Logic

需求流程图

输入数据安全性检查

权限处理

功能模块之间依赖关系

#### Efficiency

代码逻辑、备注 简洁

性能

#### Data layer

MySQL Pool 关系型数据池

NoSQL Pool 非关系型数据池

KV(memcache/redis/...) 数据层性能，消耗

Bottleneck 比如MySQL表关联

#### Data security

XSS 、CSRF 注入

Transit 中转注入

Verification 校验

#### Extension

Encrypt 加密

Compress 数据压缩、利传输

#### ...

目前先整理这些，期待大前端时代的到来。
