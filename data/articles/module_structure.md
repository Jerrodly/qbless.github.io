#Module Structure [#front-end#](/#front-end)

##Why

命名冲突，文件依赖，维护性低，优化性低，等问题。在使用模块化开发将得到解决、优化

Detailed: https://github.com/seajs/seajs/issues/547

##Definition

主流的模块化规范有CMD / AMD，各自定义都不同。

CMD主张按需加载，AMD则更倾向于预先加载。

Detailed: https://github.com/seajs/seajs/issues/588

##Structure

```
assets
  |-- dist    分发
  |-- src     源码
       |-- app        应用
       |-- conf       配置
       |-- lib        类库
       |-- template   模板
       |-- theme      主题
       |-- util       工具
       |-- widget     挂件
```

###dist

使用构建工具进行构建后，对外分发的目录

###src

source code directory，前端代码，都在此目录进行编写

####app

应用目录。建议与页面进行对应关系。一个页面对应一个文件。

eg: http://domain/user/login -> user/login.js

####conf

配置目录。存放整个前端项目所有非接口类的配置

####lib

第三方类库目录。 eg: jquery bootstrap

####template

模板目录。视图渲染，能在前端处理的，坚决不放到后端处理。减少服务器性能开销。

####theme

主题目录。主要是存放CSS源码

####util

工具目录。存放自定义封装的类库

####widget

挂件目录。页面出现重复性功能块时，将其封装成挂件，再进行引用调用。

##PS

前端模块化，使我们摆脱了前端传统茹毛饮血的日子。

如果你是一个前端工程师，那么路还很长，AngularJS React NodeJS，多去玩玩

如果你是一个杂食Web Developer

那么请不要再过上后退的日子了！！！不求富裕，至少小康！！！

请一定要掌握前端模块化开发。

项目多的情况下。工具、挂件的复用性将会大大提升。