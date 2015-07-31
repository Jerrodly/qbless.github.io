#PHP Documentor [#php#](/#php)

##Step
#####0.下载最新版本(phpDocumentor-1.5.0a1 2012-09-01)

http://sourceforge.net/projects/phpdocu/files/

#####1.解压后。打开phpdoc.bat

line:16
```
SET phpCli=C:\usr\local\php\cli\php.exe
->
SET phpCli=D:\Develop\php\5.3.27\php.exe
```
php路径修改为本机正确路径

#####2.替换目录下的
```
iso-8859-1
->
utf-8
```
否则会出现乱码

#####3.执行生成命令

生成HTML文档：
```
phpdoc -d "D:\Website\application" -t "D:\Website\docs"
```

生成CHM文档：
```
phpdoc -d "D:\Website\application" -t "D:\Website\docs" -o "CHM:default:default"
```

生成PDF文档：
```
phpdoc -d "D:\Website\application" -t "D:\Website\docs" -o "PDF:default:default"
```

#####4.生成的CHM为源码。需要下载 Microsoft HTML Help Workshop 进行打包

http://msdn.microsoft.com/en-us/library/ms669985.aspx


##DocBlock
```
@abstract
抽象类的变量和方法

@access
public, private or protected
文档的访问、使用权限. @access private 表明这个文档是被保护的。

@author
张三 <zhangsan@163.com>
文档作者

@copyright
名称 时间
文档版权信息

@deprecated
version
文档中被废除的方法

@deprec
同 @deprecated

@example
/path/to/example
文档的外部保存的示例文件的位置。

@exception
文档中方法抛出的异常，也可参照 @throws.

@global
类型：$globalvarname
文档中的全局变量及有关的方法和函数

@ignore
忽略文档中指定的关键字

@internal
开发团队内部信息

@link
URL
类似于license 但还可以通过link找到文档中的更多个详细的信息

@name
变量别名
为某个变量指定别名

@magic
phpdoc.de compatibility

@package
封装包的名称
一组相关类、函数封装的包名称

@param
如 [$username] 用户名
变量含义注释

@return
如 返回bool 函数返回结果描述，一般不用在void（空返回结果的）的函数中

@see
如 Class Login()
文件关联的任何元素（全局变量，包括，页面，类，函数，定义，方法，变量）。

@since
version
记录什么时候对文档的哪些部分进行了更改

@static
记录静态类、方法

@staticvar
在类、函数中使用的静态变量

@subpackage
子版本

@throws
某一方法抛出的异常

@todo
表示文件未完成或者要完善的地方

@var
type
文档中的变量及其类型

@version
文档、类、函数的版本信息
```


##Command parameters
```
-c, –config
用于加载配置文件

-cp, –converterparams
用于传递扩展转换器的动态参数，选项以逗号分隔

-ct, –customtags
自定义标签选项，选项以逗号分隔

-dh, –hidden
使用此选项用于屏蔽分析以.开头的文件

-dc, –defaultcategoryname
用于设置任何未分类的文件的默认分类

-dn, –defaultpackagename
用于设置任何未定义包名称的默认包名称

-d, –directory
这个选项或者-f选项必须要制定，如果使用-d，则会递归的分析指定的目录下以.php结尾的文件

-ed, –examplesdir
指定实例文件夹

-f, –filename
这个选项或者-d必须指定一个，如果使用-f，会分析单个文件

-i, –ignore
设置需要忽略的文件或者目录

-is, –ignoresymlinks
设定忽略符号链接

-it, –ignore-tags
设定忽略标签

-j, –javadocdesc
设定解析时兼容javadoc格式

-o, –output
设置输出文件的格式

HTML:frames:* – 包含iframe的HTML格式
HTML:frames:default – Javadoc风格的文档模板，很少有格式
HTML:frames:earthli – 漂亮的模板（作者：Marco von Ballmoos）
HTML:frames:l0l33t – 流行模板
HTML:frames:phpdoc.de – 类似于phpdoc.de的PHPDoc输出
HTML:frames:phphtmllib – 非常棒的用户贡献模板
HTML:frames:phpedit – 基于PHPEdit Help Generator的文档
HTML:Smarty:* – 不使用iframe的HTML格式
HTML:Smarty:default – 使用css控制的黑体模板
HTML:Smarty:HandS – 基于PHP的格式，但是经过优化，带有logo图片
HTML:Smarty:PHP – 风格接近PHP官网
CHM:default:* – 输出CHM帮助文档
CHM:default:default – windows帮助文档，基于HTML:frames:l0l33t
PDF:default:* – PDF格式
PDF:default:default – 标准纯文本PDF格式
XML:DocBook:* – 以DocBook格式输出的XML
XML:DocBook/peardoc2:default – 可以被编译成peardoc的文档

-pp, –parseprivate
默认情况下，phpDocumentor不会把标记为@access private纳入文档，使用此选项可以将其纳入

-po, –packageoutput
使用此选项会将输出文档中以@package分组的标记（逗号分隔）删除

-p, –pear
使用此选项可以解析pear风格的文档

-q, –quiet
此选项将压缩命令行的输出

-s, –sourcecode
使用此选项会为每一个被解析的文件生成高亮代码，谨慎使用

-t, –target
目标路径，设定输出文档的目录

-tb, –templatebase
接受一个路径作为它的参数，设置文档模板的路径，不指定情况下为/phpDocumentor，phpDocument会在此路径的子文件夹下搜索可用的模板

-ti, –title
生成的文档的标题

-ue, –undocumentedelements
这个选项用于设置在遇到没有docblock标记的class或者method时，是否输出warning信息
```
