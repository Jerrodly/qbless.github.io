#Vim [#tool#](/#tool)

##Dwonload & Install

http://www.vim.org/download.php

##Command

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

改变当前目录
```
:cd /website
```


##vimrc

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
set ts=4
```

高光当前行
```
set cursorline
```

自动缩进
```
set autoindent
```

tab显示为 >- 行尾空格为 -
```
set listchars=tab:>-,trail:-
```

语法高亮
```
syntax on
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
