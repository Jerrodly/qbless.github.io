#Static blog

## SeaJS

使用前端模块化加载器SeaJS进行模块化开发

https://github.com/seajs/seajs

## SeaJS-CSS

https://github.com/seajs/seajs-css

SeaJS官方提供加载样式插件

在多个页面的情况下，由JavaScript进行加载样式。在不支持SSI的环境下，减少代码冗余，可维护性提高。

## SeaJS-TEXT

https://github.com/seajs/seajs-text

SeaJS官方提供加载文本插件

这边我们使用它进行加载 .md 文件

由于默认只支持加载 .tpl .html 后缀文件，所以我修改了源码

```
ext:[".tpl",".html"]

->

ext:[".md",".tpl",".html"]
```

## Marked

https://github.com/chjj/marked

可以将 MarkDown 进行转成成 HTML 的第三方插件

由于使用了前端加载器，所以把 Marked 进行了CMD规范封装

##Steps

#### 0.创建一个 404.htm

GitHub提供了一个404的自定义页面，在访问不到改页面的情况下，进行加载404页面。
```
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Kirin's Blog</title>
</head>
<body>Loading...</body>
<script src='/asset/lib/sea.min.js'></script>
<script src='/asset/lib/seajs-text.min.js'></script>
<script src='/asset/lib/seajs-css.min.js'></script>
<script src='/asset/init.js'></script>
<script>seajs.use('load');</script>
</html>
```

#### 1.创建 init.js

初始化加载器配置，将 asset 指定为前端加载的根目录，并且将常用的 JQUERY MARKED 进行别名配置
```
//获取根路径放到全局对象G里面
var tmp = {}, G = {};
tmp.scripts = document.scripts;
tmp.current = tmp.scripts[tmp.scripts.length - 1];
G.baseUrl = tmp.current.src.substring(0, tmp.current.src.lastIndexOf('init.js'));
tmp = {}; //释放

//seajs 配置
seajs.config({
  base  : G.baseUrl,
  alias : {
    'jquery' : 'lib/jquery.min',
    'marked' : 'lib/marked.min'
  }
});
```

#### 2.创建 init.js

文章加载逻辑

根据URL获取当前加载的文件页面 PAGE

进行加载指定的 MarkDown 文件，转换为 HTML 后，将 HTML 放置到 BODY 进行显示

加载样式文件 ps.当然也也可以在404.htm进行加载

首页不同的分类，根据HASH进行判断

三秒后加载，非本站地址打开新窗口，CNZZ统计，多说评论
```
define(function (require, exports, module) {
  $ = require('jquery');
  marked = require('marked');

  //ACCORDING TO IDENTIFY THE PAGE URL
  var page;
  page = window.location.href.split(window.location.host)[1].substr(1);
  page = page.indexOf('.html') < 0 ? page : page.substr(0, page.indexOf('.html'));
  page = page.indexOf('#') < 0 ? page : page.substr(0, page.indexOf('#'));
  page = page || 'index';

  //LOAD ARTICLE
  require.async('md/'+page+'.md', function(content) {
    $('body').html(marked(content));
  });

  //LOAD CSS
  require.async('theme/base.min.css');
  
  var category = function(name) {
    if (!name) {
      $('a[href^="/#"]').parents('li').show();
    } else {
      $('a[href^="/#"]').parents('li').hide();
      $('a[href^="/#"]').each(function() {
        if (this.href.indexOf(name) > 0) {
          $(this).parents('li').show();
        }
      })
    }
  }
  
  //DELAYED LOAD
  setTimeout(function() {

    if ('index' == page) {
      if (window.location.hash.substr(1)) {
        category(window.location.hash.substr(1));
      }
      $('a[href^="/#"]').click(function(){category(this.href.split('#')[1])});
    }
    
    //NON-SITE ADDRESS, OPEN A NEW PAGE
    $('a').each(function() {
      if (this.href.indexOf(window.location.host) < 0) {
        $(this).attr('target', '_blank');
      }
    });

    //LOAD CNZZ
    $.getScript("http://s95.cnzz.com/stat.php?id=1253192811");

    //Load DUOSUO
    window.duoshuoQuery = {short_name:"qbless"};
    $('body').append('<div class="ds-thread" data-thread-key="'+page+'" data-title="'+window.document.title+'" data-url="'+window.location.href+'"></div>');
    $.getScript("http://static.duoshuo.com/embed.js");

  }, 3*1000);
});

```

ps. 该机制采用异步加载文章内容的方式。对搜索引擎的友好度太低，请谨慎考虑。
ps2. 据说Google未来新的采集机制是将页面最终效果进行采集。
