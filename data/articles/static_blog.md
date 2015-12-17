静态博客

只要 ```列表```、```文章```、```评论``` 就够了！！！

### Base

1. html body : null

2. css rendering (github)

3. js loading content

4. markdown articles

5. use duoshuo comments

6. use cnzz stat

单一HTML入口文件，加载css, js。通过url进行加载不同的markdown写的文章，然后通过第三方类marked进行markdown->html转换，最后写入body。再根据url不同，加载多说评论框，加载cnzz统计。

### Library

#### Marked

可以将 MarkDown 进行转成成 HTML 的第三方插件

https://github.com/chjj/marked

#### Highlight

代码高亮

https://highlightjs.org/

#### SeaJS

使用前端模块化加载器SeaJS进行模块化开发

https://github.com/seajs/seajs

#### SeaJS-CSS

SeaJS官方提供加载样式插件

https://github.com/seajs/seajs-css

#### SeaJS-TEXT

SeaJS官方提供加载文本插件

https://github.com/seajs/seajs-text

#### Requirejs

AMD机制模块化加载器

http://www.requirejs.org/

#### Requirejs-TEXT

官方提供的文本加载插件

https://github.com/requirejs/text

### V1

Source: https://github.com/qbless/qbless.github.io/tree/master/v1

1. seajs 加载模块化方式开发，避免类名冲突、文件加载混乱等等问题

2. seajs-css 在多个页面的情况下，由JavaScript进行加载样式。在不支持SSI的环境下，减少代码冗余，可维护性提高。

3. saejs-text 加载内容。这边我们使用它进行加载 .md 文件。由于默认只支持加载 .tpl .html 后缀文件，所以修改了源码 ```ext:[".tpl",".html"]``` -> ```ext:[".md",".tpl",".html"]```

4. marked 由于使用了前端加载器，所以把 Marked 进行了CMD规范封装

5. 404.html github提供自定义页面，将所有链接都访问当这个文件，然后该文件进行加载load.js，然后进行处理。 若非github，则需修改nginx.conf

```
if (!-e $request_filename) {
    rewrite ^/(.*)$ /404.html last;
}
location = / {
    rewrite ^/(.*)$ /404.html last;
}
```

### V2

Source: https://github.com/qbless/qbless.github.io/tree/master/v2

由于使用404页面，每次页面之间跳转，都会重新加载html css js md，资源浪费严重。故而改成根据url上面的hash变更进行不同加载

1. hashbang #! 使用哈希棒，有利于搜索引擎友好度

2. onhashchange 绑定该事件，在hash变更的时候，调用某函数

3. navigator userAgent 根据ua判断是否是移动端(iPhone, Andorid)，添加 meta viewport width=device-width 实现移动端设备加载显示大小异常问题。

4. index.html 将404.html修改为index.html，http status code 会从404变更为200

### V3

Source: https://github.com/qbless/qbless.github.io/tree/master/v3

seajs切换到requirejs, amd预先加载机制有利于缩减整体时间。

1. r.js 使用官方提供压缩构建工具

2. 优化代码，将散落冗余的字符串统一到变量里面

3. dist 正式发布使用压缩后的js, css

### V4

Source: https://github.com/qbless/qbless.github.io/tree/master/v4

将 ```index.md``` 剥离到js层。 首页开始加载部分文章内容，将 归档、标签、日期、友链等信息动态化加载。

1. structure 页面划分为：头部、内容、评论、侧边、尾部 等

2. highlight 将代码区进行高亮

3. ucfirst 首字母大写，有利于页面美观

4. data/base.js 相关数据配置化

5. pages 分页处理列表页面
