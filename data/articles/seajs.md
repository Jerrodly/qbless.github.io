#Seajs [#front-end#](/#front-end)

##What's this

A Module Loader for the Web

提供简单、极致的模块化开发体验

##Why use it

SeaJS 追求简单、自然的代码书写和组织方式，具有以下核心特性：

简单友好的模块定义规范：SeaJS 遵循CMD规范，可以像Node.js一般书写模块代码。

自然直观的代码组织方式：依赖的自动加载、配置的简洁清晰，可以让我们更多地享受编码的乐趣。

##Config

```
seajs.config({

  // 别名配置
  alias: {
    'es5-safe': 'gallery/es5-safe/0.9.3/es5-safe',
    'json': 'gallery/json/1.0.2/json',
    'jquery': 'jquery/jquery/1.10.1/jquery'
  },

  // 路径配置
  paths: {
    'gallery': 'https://a.alipayobjects.com/gallery'
  },

  // 变量配置
  vars: {
    'locale': 'zh-cn'
  },

  // 映射配置
  map: [
    ['http://example.com/js/app/', 'http://localhost/js/app/']
  ],

  // 预加载项
  preload: [
    Function.prototype.bind ? '' : 'es5-safe',
    this.JSON ? '' : 'json'
  ],

  // 调试模式
  debug: true,

  // Sea.js 的基础路径
  base: 'http://example.com/path/to/base/',

  // 文件编码
  charset: 'utf-8'
});
```

Detailed: https://github.com/seajs/seajs/issues/262

##Use

在页面中加载一个或多个模块

```
// 加载一个模块
seajs.use('./a');

// 加载一个模块，在加载完成时，执行回调
seajs.use('./a', function(a) {
  a.doSomething();
});

// 加载多个模块，在加载完成时，执行回调
seajs.use(['./a', './b'], function(a, b) {
  a.doSomething();
  b.doSomething();
});
```

##Module

```
// 所有模块都通过 define 来定义
define(function(require, exports, module) {

  // 通过 require 引入依赖
  var $ = require('jquery');
  var Spinning = require('./spinning');

  // 通过 exports 对外提供接口
  exports.doSomething = ...

  // 或者通过 module.exports 提供整个接口
  module.exports = ...

});
```

更多详细使用。请参考 http://seajs.org/docs/