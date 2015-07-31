#在PHP里，是object方法好？还是class方法好？这是个问题！ [#php#](/#php) [#excerpt#](/#excerpt)

Via: http://hi.baidu.com/thinkinginlamp/item/009e5705e0e43ad21ff046e8

作者：老王

先统一名词解释：何谓object方法？何谓class方法？从下面例子代码可以看出：

```
class Foo
{
    public function a_object_method()
    {
        // ...
    }

    public static function a_class_method()
    {
        // ...
    }
}
```

object方法是动态的，先实例化对象然后再调用；class方法是静态的，不用实例化对象，直接在类上调用。

在PHP里，是object方法好？还是class方法好？乍一听起来，问题本身似乎就有问题，因为object方法和class方法的意义原本就不同，不存在可比性，就好像讨论empty和isset哪个快一样，因为它们的意义不同，所以不管结果如何，都没有太大意义。但是由于PHP运行环境的特殊性，让我们不能再用老眼光看问题，下面详细阐述一下：

在类方法里只能使用类属性，也就是static属性，为了更深刻的理解问题，先看看Java中的static属性：Java程序会运行在Tomcat之类的容器里，如果我们设置一个类的static属性，只要你别重启容器，那么变化就会被容器持久保存在内存中，不仅每次请求，而且每个对象都能共享它，再看看PHP，由于没有所谓容器的概念，它的运行是瞬态的，在多次请求间，如果使用对象的话，它们需要重复的实例化出来，static属性仅仅在当次请求有效，而不会持久保存在内存中，从这个意义上讲，在PHP里，既然每次请求开始时都要重新建立运行环境，结束后一切都灰飞烟灭，那么可以把class本身也看做是对象，一种不用实例化的对象，我们姑且称之为类对象，而static属性就可以看做是类对象的属性。那在PHP中什么时候可以使用这样的类对象呢？主要看你是否需要区分状态！比如说MVC中的Action，一般一次请求里仅仅会用一次，所以不需要区分状态，所以就可以使用类对象的形式；再比如文章列表页，如果每条记录都是一个对象的话，那么就必须使用实例化出来的真正的对象，而不能使用类对象，因为在类对象里，只能使用static属性，不能区分不同的状态。

如此说来，假如我们设计一个PHP框架的话，由于在一次请求里，框架本身的组件基本都仅仅执行一次（比如说前端控制器），不需要区分状态，所以除了可以使用object方法，还可以使用class方法。那么class方法是否可取就看是利大于弊，还是弊大于利。

先看看利，我们用程序来测试一下性能：

```
<?php
class Bench
{
    private $object_bar;

    private static $class_bar;

    public function __construct($bar)
    {
        $this->object_bar = $bar;
    }

    public function a_object_method()
    {
        return $this->object_bar;
    }

    public static function init($bar)
    {
        self::$class_bar = $bar;
    }

    public static function a_class_method()
    {
        return self::$class_bar;
    }
 }


$counter = 100;

$start = microtime(true);
for ($i = 0; $i < $counter; $i++) {
    $bench = new Bench(null);
    $bench->a_object_method();
}
$end = microtime(true);

echo "Object Method: ", ($end - $start), "\n";

$start = microtime(true);
for ($i = 0; $i < $counter; $i++) {
    Bench::init(null);
    Bench::a_class_method();
}
$end = microtime(true);

echo "Class Method:  ", ($end - $start), "\n";

?>
```

每次请求，一般情况下都要设置一些初始化参数，所以在测试时我们加入了初始化的过程，结果显示class方法比object方法稍微快一点点：

```
Object Method: 0.00071191787719727
Class Method:  0.00057101249694824
```

注意：测试环境为 PHP5.3.2，Windows，Linux下结论类似，其它PHP版本未测试。

再看看弊，其实你搜索一下static is evil就能看到很多：

大量使用static之后，多态基本不可能了，继而Mock也不可能了，可测试性打折扣。


总结：在PHP里，到底应该如何OOP，我个人观点总在摇摆，有时候觉得object方法好，有时候又觉得class方法好，但就目前来说，我觉得鉴于PHP特殊的运行方式，应该重视class方法，但不应该大范围使用，相比较而言，更倾向于传统的object方法，因为class方法虽然不用实例化对象，但从测试结果来看，和object方法相比，它提升的性能幅度非常有限，而作为代价，多态，可测试性等必要特性都统统丧失了，这让我有种得不偿失的感觉。

补充：即便作为优势，class方法比object方法快一点点，但这也不是绝对的。某些情况下，class方法慢于object方法：如果单个类/对象方法调用次数很多的话，那么由于单独的对象操作符“->”快于类操作符“::”，若干个方法调用后，累加起来甚至能抵消实例化的 效率损耗，从而导致object方法快于class方法，如果想验证，可以把上面测试代码中的$bench = new Bench(null);和Bench::init(null);拿到循环外面后再运行程序。

儿童节刚过，记得小时候上语文课的时候，老师教我们写作文要首尾呼应，我一直都记着，所以我的作文分数都很高，末了，请允许我模仿哈姆雷图的口吻拽句英文，呼应一下主题：Object Method or Class Method, That is the question.
