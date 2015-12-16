#Linux Crontab [#linux#](/#linux)

Linux系统，指定时间执行制定任务

##Parameter

crontab -l 显示所有现存计划任务

crontab -e 编辑当前的计划任务

crontab –r  删除目前的时程表

##Usage

```
* * * * * command

分 时 日 月 周 命令
```


第一个数字是每小时的第几分钟

第二个数字是每天的第几小时

第三个数字是每月的第几天

第四个数字是每年的第几月

第五个数字是每周的第几天
 
eg:
```
00 4 * * * /home/hehe.sh

每天4：00分执行hehe.sh脚本
```
