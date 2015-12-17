### 前提

我们正常的MVC接口：数据库获取列表model -> 传给控制器controller -> 然后再传给smart view

QA: 我数据库里面有一个字段为json_encode处理过的数据。如果我不想在controller里面foreach转换，那么我就想，smarty可以做到吗？

阅读了smarty相关手册，代码。发现这个问题。无法解决。缘由如下：

如果我们要在smarty里面循环的时候赋一个新的变量。通常有2种方式： assign, eval

assign:

```
 属性    类型    是否必须    缺省值    描述
 var   string    Yes        n/a    被赋值的变量名
value  string    Yes        n/a    赋给变量的值
```

```
{assign var="name" value="Bob"}

The value of $name is {$name}.

OUTPUT:

The value of $name is Bob.
```

eval:

```
 属性    类型    是否必须    缺省值    描述
 var    mixed    Yes        n/a    待求值的变量(或字符串)
value  string    Yes        n/a    输出值将被赋给模板变量的名称
```

```
setup.conf
----------

emphstart = <b>
emphend = </b>
title = Welcome to {$company}'s home page!
ErrorCity = You must supply a {#emphstart#}city{#emphend#}.
ErrorState = You must supply a {#emphstart#}state{#emphend#}.


index.tpl
---------

{config_load file="setup.conf"}

{eval var=$foo}
{eval var=#title#}
{eval var=#ErrorCity#}
{eval var=#ErrorState# assign="state_error"}
{$state_error}

OUTPUT:

This is the contents of foo.
Welcome to Foobar Pub & Grill's home page!
You must supply a <b>city</b>.
You must supply a <b>state</b>.
```

由于我们json转换出来的数据为array。 smarty的assign方法，2个参数都必须是string。so. fired

这个时候，我们发现。eval 的 var 是 mixed混合类型的。那么，我可不可以寄希望它支持array数据呢。试试吧。 try do it…

### 0.我在smarty里面。加入以下代码

```
{{eval var='a'|range:'g' assign=arr}}

{{$arr}}
```

保存。页面刷新。希望是" Array" 。 可惜不是。那么我们看看为什么 "{{eval var='a'|range:'g' assign=arr}}" 在smarty里面的调用步骤吧。

### 1.我们打开smarty编译后的模板。

```
echo smarty_function_eval(array('var' => ((is_array($_tmp='a')) ? $this->_run_mod_handler('range', true, $_tmp, 'g') : range($_tmp, 'g')),'assign' => 'arr'), $this);

echo $this->_tpl_vars['param'];
```

看到编译后的代码， ((is_array($_tmp='a')) ? $this->_run_mod_handler('range', true, $_tmp, 'g') : range($_tmp, 'g')) 直接打印出来。的确是一个数据。那么问题可能就出现在 smarty_function_eval 身上了。

### 2.打开smarty/lib/plugins/function.eval.php

```
function smarty_function_eval($params, &$smarty)
{
 
    if (!isset($params['var'])) {
        $smarty->trigger_error("eval: missing 'var' parameter");
        return;
    }
 
    if($params['var'] == '') {
        return;
    }
 
    $smarty->_compile_source('evaluated template', $params['var'], $_var_compiled);
 
    ob_start();
    $smarty->_eval('?>' . $_var_compiled);
    $_contents = ob_get_contents();
    ob_end_clean();
 
    if (!empty($params['assign'])) {
        $smarty->assign($params['assign'], $_contents);
    } else {
        return $_contents;
    }
}
```

在方法一进来，我直接打印出$params变量。发现数据还是有传递进来。那么应该就是方法里面的某些代码出现了问题。 逐步排查。
看到了 line13： $smarty->_compile_source('evaluated template', $params['var'], $_var_compiled);

### 3.再打开smarty/Smarty.class.php

```
/**
 * compile the given source
 *
 * @param string $resource_name
 * @param string $source_content
 * @param string $compiled_content
 * @return boolean
 */
function _compile_source($resource_name, &$source_content, &$compiled_content, $cache_include_path=null) {
...
}
```

从这个方法的注释里面。我们看到前面传递过来的数据，被定义为了string使用。

这个时候猜测，是不是注释错了呢。还是仍然支持呢。

再继续逐步排查。在下面这张代码的调用里面。有进行了数据的修改。

### 4.再打开smarty/Smarty_Compiler.class.php

```
/**
 * compile a resource
 *
 * sets $compiled_content to the compiled source
 * @param string $resource_name
 * @param string $source_content
 * @param string $compiled_content
 * @return true
 */
function _compile_file($resource_name, $source_content, &$compiled_content) {
...
}
```

这个方法。我们发现了待被返回的变量 $compiled_content ,居然在方法里面，真的被注释预言到了。string处理掉了。

### 总结

smarty不支持给变量传数组，对象等数据。只支持string  or int

ps. nnd. smarty手册注释太不靠谱了。

再说说smarty其他缺点： 1. smarty不兼容自动加载规则。 2. 编译后代码臃肿，低效。

也建议大家，放弃所有的php衍生模板。

因为：

##### php本身就是一个很好的模板语言。
