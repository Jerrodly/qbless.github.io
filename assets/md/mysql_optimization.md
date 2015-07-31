#MySQL Optimization [#mysql#](/#mysql)

via: http://www.imooc.com/learn/194

##Option
硬件
配置
表结构
SQL+Index

成本：递减。硬件最高，SQL+Index最低

效果：递增。硬件最小，SQL+Index最大

硬件归老板

配置归运维

表结构、语句、索引归程序

##SQL / Index怎么看出来有问题的？

 - 查询次数多，并且每次查询占用时间长
 - IO大(扫描行总数大)
 - 未命中索引

通过Slow query, Explain进行分析

##有问题了，怎么处理？

 - 建立适当的索引
 - 调整SQL语句，命中索引，降低IO
 - 表字段优化(小，简单)
 - 垂直拆分
 - 水平拆分

##Slow Query

```
show variables like 'slow_query_log'
查询是否开启

set global slow_query_log = on
开启

set global slow_query_log_file = '/home/mysql/logs/slow.log'
设置日志文件

set global log_queries_not_using_indexes = on
开启SQL语句没使用索引则记录

set global long_query_time = 1
设置超过多少秒则记录
```

##MysqlDumpSlow

eg:
``
./mysqldumpslow -s c -t 10 /home/mysql/logs/slow.log
``

###Usage

```
mysqldumpslow [ OPTS... ] [ LOGS... ]
Parse and summarize the MySQL slow query log. Options are
  --verbose    verbose
  --debug      debug
  --help       write this text to standard output
  -v           verbose
  -d           debug
  -s ORDER     what to sort by (al, at, ar, c, l, r, t), 'at' is default
                al: average lock time
                ar: average rows sent
                at: average query time
                 c: count
                 l: lock time
                 r: rows sent
                 t: query time 
  -r           reverse the sort order (largest last instead of first)
  -t NUM       just show the top n queries
  -a           don't abstract all numbers to N and strings to 'S'
  -n NUM       abstract numbers with at least n digits within names
  -g PATTERN   grep: only consider stmts that include this string
  -h HOSTNAME  hostname of db server for *-slow.log filename (can be wildcard),
               default is '*', i.e. match all
  -i NAME      name of server instance (if using mysql.server startup script)
  -l           don't subtract lock time from total time
```

##Explain

eg:
``
explain select * from test
``

```
table：显示这一行的数据是关于哪张表的

type：这是重要的列，显示连接使用了何种类型。从最好到最差的连接类型为const、eq_reg、ref、range、indexhe和ALL

possible_keys：显示可能应用在这张表中的索引。如果为空，没有可能的索引。可以为相关的域从WHERE语句中选择一个合适的语句

key： 实际使用的索引。如果为NULL，则没有使用索引。很少的情况下，MYSQL会选择优化不足的索引。这种情况下，可以在SELECT语句中使用USE INDEX（indexname）来强制使用一个索引或者用IGNORE INDEX（indexname）来强制MYSQL忽略索引

key_len：使用的索引的长度。在不损失精确性的情况下，长度越短越好

ref：显示索引的哪一列被使用了，如果可能的话，是一个常数

rows：MYSQL认为必须检查的用来返回请求数据的行数

Extra：关于MYSQL如何解析查询的额外信息。将在表4.3中讨论，但这里可以看到的坏的例子是Using temporary和Using filesort，意思MYSQL根本不能使用索引，结果是检索会很慢
```
Type类型：

```
const 
表中的一个记录的最大值能够匹配这个查询（索引可以是主键或惟一索引）。因为只有一行，这个值实际就是常数，因为MYSQL先读这个值然后把它当做常数来对待 

eq_ref 
在连接中，MYSQL在查询时，从前面的表中，对每一个记录的联合都从表中读取一个记录，它在查询使用了索引为主键或惟一键的全部时使用 

ref 
这个连接类型只有在查询使用了不是惟一或主键的键或者是这些类型的部分（比如，利用最左边前缀）时发生。对于之前的表的每一个行联合，全部记录都将从表中读出。这个类型严重依赖于根据索引匹配的记录多少—越少越好 

range 
这个连接类型使用索引返回一个范围中的行，比如使用>或<查找东西时发生的情况 

index 
这个连接类型对前面的表中的每一个记录联合进行完全扫描（比ALL更好，因为索引一般小于表数据） 

ALL 
这个连接类型对于前面的每一个记录联合进行完全扫描，这一般比较糟糕，应该尽量避免
```

Extra:

```
Distinct 
一旦MYSQL找到了与行相联合匹配的行，就不再搜索了 

Not exists 
MYSQL优化了LEFT JOIN，一旦它找到了匹配LEFT JOIN标准的行， 

就不再搜索了 

Range checked for each 

Record（index map:#） 
没有找到理想的索引，因此对于从前面表中来的每一个行组合，MYSQL检查使用哪个索引，并用它来从表中返回行。这是使用索引的最慢的连接之一 

Using filesort 
看到这个的时候，查询就需要优化了。MYSQL需要进行额外的步骤来发现如何对返回的行排序。它根据连接类型以及存储排序键值和匹配条件的全部行的行指针来排序全部行 

Using index 
列数据是从仅仅使用了索引中的信息而没有读取实际的行动的表返回的，这发生在对表的全部的请求列都是同一个索引的部分的时候 

Using temporary 
看到这个的时候，查询需要优化了。这里，MYSQL需要创建一个临时表来存储结果，这通常发生在对不同的列集进行ORDER BY上，而不是GROUP BY上 

Where used 
使用了WHERE从句来限制哪些行将与下一张表匹配或者是返回给用户。如果不想返回表中的全部行，并且连接类型ALL或index，这就会发生，或者是查询有问题 
```

