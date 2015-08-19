#RequireJS [#front-end#](/#front-end)

##AMD (Asynchronous Module Definition)

异步模块加载机制。

从它的规范描述页面看，AMD很短也很简单，但它却完整描述了模块的定义，依赖关系，引用关系以及加载机制。

##Structure

[Module Structure](/module_structure)

##Config

```
requirejs.config({
	baseUrl: '/assets/src/app',
	paths: {
		'lib': '../lib',
		'util': '../util',
		'widget': '../widget',
		'jquery': '../lib/jquery/1.7.1',
		'jquery/plugin': '../lib/jquery/plugin'
	},
	shim: {
		'jquery/plugin/unslider' : ['jquery']
	}
});
```

baseUrl: 所有模块的查找根路径

paths: 映射那些不直接放置于baseUrl下的模块

shim: 为那些没有使用define()来声明依赖关系、设置模块的"浏览器全局变量注入"型脚本做依赖和导出配置

##Build

构建使用requirejs自带的r.js进行构建，依赖于nodejs。CentOS: yum install nodejs
```
//eg: https://github.com/jrburke/r.js/blob/master/build/example.build.js
({
	appDir: './',
	baseUrl: 'app',
	dir: '../dist',
	mainConfigFile: './conf/main.js',
	fileExclusionRegExp: /^(r|build)\.js$/,
	preserveLicenseComments: false,
	modules: [
		{
			name: 'lib/requirejs/2.1.20',
			include: [
				'../conf/main',
				'../conf/dist'
			]
		},
		{
			name: 'inc/user',
			exclude: ['jquery']
		},
		{
			name: 'user/profile',
			insertRequire: ['user/profile'],
			exclude: ['jquery', 'inc/user']
		}
	]
});
```
appDir: 应用程序的顶级目录

baseUrl: 默认情况下，所以的模块都相对于这个路径存在

dir: 文件输出的顶级目录。如果没有指定的话，默认会创建一个“build”目录在build文件的路径中。所有相对路径是相对于构建文件

mainConfigFile: RequireJS的主配置文件。这里要区分配置文件和入口文件的区别

fileExclusionRegExp: 跳过r.js build.js文件

preserveLicenseComments: 默认注释有授权在里面。当然，在大项目生成时，文件比较多，注释也比较多，这样可以把所有注释写在文件的顶部

modules:

	name: 模块名

	include: 构建包含

	exclude: 构建排出

	insertRequire: 构建自动插入执行加载

requirejs构建将自动将config进行包含压缩，避免在调用中进行加载config导致冗余

app/inc 为多页面通用型包含，一般不包含压缩所有页面通用型js. eg:jquery

app/user/login 具体业务应用。压缩排出所有页面通用型与多页面通用型js，并且自动追加执行加载

##Parser

common/assets.html
```
<?if (in_array(ENVIRON, array('tests', 'product'))):?>
<script type="text/javascript" src="/assets/dist/lib/requirejs/2.1.20.js" ></script>
<script type="text/javascript" src="/assets/dist/lib/jquery/1.7.1.js" ></script>
<?if ('user' == App::getCtrName()):?><script type="text/javascript" src="/assets/dist/app/inc/user.js" ></script><?endif;?>
<script type="text/javascript" src="/assets/dist/app/<?=App::getCtrName();?>/<?=App::getActName();?>.js" ></script>
<?else:?>
<script type="text/javascript" src="/static/src/lib/requirejs/2.1.20.js" ></script>
<script type="text/javascript" src="/static/src/conf/main.js" ></script>
<script type="text/javascript">requirejs(['<?=App::getCtrName();?>/<?=App::getActName();?>'])</script>
<?endif;?>
```

测试环境与生产环境使用构建分发版本，避免测试与生产差异导致线上BUG。

开发环境是用源码版本，避免开发过程中频繁进行构建动作。

构建版本中：

js文件又浏览器进行加载，避免使用JS加载而增加渲染时间。

正常情况下，只有4个文件，加载器、jQuery、部分通用型JS、本页面逻辑JS。

jquery为所有页面通用型js，所以不进行包含构建，载入新页面是，jquery可以直接从浏览器缓存中取，减小加载。

app/inc/user.js为首页部分通用型js，在 profile / favor / like 等页面有冗余，将冗余包含构建到inc。

##Coding

1. 为某页面创建js，define定义

2. 加载通用型JS

3. 开发逻辑流程

4. build.js 增加该模块

5. cd assets/src; node r.js -o build.js;  #进行构建

6. 测试构建后功能
