### Dwonload & Install

http://www.vim.org/download.php

### Command

新建

```
:new
```

打开

```
:e
```

退出

```
:q
```

tab打开

```
:tabe
```

tab关闭

```
:tabc
```

tab新建

```
:tabnew
```

垂直窗口打开

```
:vsp
```

窗口光标切换

```
:ctrl + w
```

buffer转换为tab

```
:bufdo tab split
```

打开寄存器

```
:reg
```

改变当前目录

```
:cd /website
```

### Shortcut Key

移动

```
h 左
j 下
k 上
l 右
0 行首
$ 行尾
^ 行首字符
{num}gg 第{num}行
ctrl+b 上翻页
ctrl+f 下翻页
/string n 搜索，下一项
```

还原

```
u
```

选择

```
v 按字符
V 按行
```

复制

```
y
```

粘贴

```
p
```

自动补全

```
ctrl+n
```

### vimrc

编码支持utf8 gbk ...

```
set fileencodings=utf-8,gb18030,utf-16,big5
```

显示行号

```
set number
```

tab = 4 spaces

```
set tabstop=4
set shiftwidth=4
```

用空格代替制表符

```
set expandtab
```

高光当前行

```
set cursorline
```

自动缩进

```
set autoindent
```

粘贴不缩进

```
set paste
```

tab显示为 >- 行尾空格为 -

```
set list
set listchars=tab:>-,trail:-
```

语法高亮

```
syntax on
```

关闭swap

```
set noswapfile
```

移除工具栏、滚动条

```
set go-=T "guioptions remove toolbar
set go-=L "guioptions remove left-hand scroll bar
set go-=r "guioptions remove right-hand scroll bar
```

字体

```
set guifont=Source\ Code\ Pro
```

下载：https://github.com/adobe-fonts/source-code-pro

主题

```
colorscheme monokai
```

下载 http://www.vim.org/scripts/script.php?script_id=4667 到 \colors 目录
