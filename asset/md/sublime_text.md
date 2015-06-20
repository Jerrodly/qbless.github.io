#Sublime Text [#tool#](/#tool)

##Download & Install
http://www.sublimetext.com/3

##Keyboard Shortcuts
切换项目(Switch Project)
```
Ctrl + Alt + p
```
命令(command) ps.可快捷打开文件
```
Ctrl + Shift + p
```
检查php文件语法问题
```
Ctrl + b
```

##Configure
Menu -> Tools -> Build System -> New Build -> 
```
{
	"cmd": ["php", "$file"],
	"file_regex": "php$", 
	"selector": "source.php" 
}
```
-> php.sublime-build

##Package Control
选择菜单 view->show console ，这时候你就可以看到下边出现了：控制台窗口。输入以下代码，就可以安装好 插件管理器（package control）
```
import urllib.request,os; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); open(os.path.join(ipp, pf), 'wb').write(urllib.request.urlopen( 'http://sublime.wbond.net/' + pf.replace(' ','%20')).read())
```
粘帖、回车、重启

##Plugin
Ctrl+Shift+P调出命令面板

输入install 调出 Install Package 选项并回车，然后在列表中选中要安装的插件

####Alignment
用于代码格式的自动对齐

####DocBlockr
自动生成注释，方便生成文档

####TortoiseSVN
Folder右键更新整个目录

快捷的调用TortoiseSVN命令

####Function Name Display

显示文件、类、方法、参数
```
{
  "display_file": true,
  "display_class": true,
  "display_function": true,
  "display_arguments": true
}
```
