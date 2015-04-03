#[[team]](/#team) Parallel Development

##Scenario reproduction

需求方A要求开发A功能块，由2-3个人组成临时小组A

需求方B要求开发B功能块，由3-4个人组成临时小组B

需求方B要求开发C功能块，由4-5个人组成临时小组C

开发流程：

代码开发提交到SVN主干Trunk。到任何环境，都是同步Trunk最新代码。

RD测试在开发环境 dev.qbless.com

QA测试在测试环境 test.qbless.com

上线到生产环境 www.qbless.com

那么问题来了。如果A小组开发的功能，并且QA测试过了A功能块，可以上线，并且需求方要求尽快上线。但是这个时候B小组还没过QA，C小组还在开发过程中，如果这个时候A功能要上线，那么需要将B小组、C小组的开发代码还原到他们开发之前的模式，然后将A小组再将Trunk打包上线。上线完成后，B小组与C小组再功能提交到Trunk上面。

整个流程，表面上，可以并行开发多个模块，但是如果有其中某一模块开发完成，需要测试、上线的时候，将会导致其他模块开发进度中断。

造成严重的开发阻塞现象！！！

那么问题来了，开发并行哪家强？

##Steps

#### 0. 创建 SVN分支 Branches/{branche}

#### 1. 跟该分支创建对应 Database 库db_{branche}

#### 2. 使用脚手架Scaffold，进行配置文件修改，host, dbname, redis 等

#### 3. 进行开发

#### 4. 开发代码由钩子自动同步到 /website/www.qbless.com/branches 。RD到测试服务器 {branche}.dev.qbless.com 进行开发测试

#### 5. 开发结束

#### 6. 打包{branche}到测试服务器 {branche}.test.qbless.com，由QA开始进行测试

#### 7. QA反馈BUG，RD修改BUG。循环，直至无BUG

#### 8. 将修改后的代码，提交至 branches/{branche}

#### 9. 提交该功能块 脚本差异列表script.txt，数据库变动 mysql.txt，其他说明 other.txt 到 Docs/module/{branche}/

#### 10. 根据 Docs/module/{branche}/ 将 Branches/{branche} 合并到 Trunk

#### 11. Trunk 同步到 test.qbless.com 进行QA最后一轮测试，修复。直至无BUG

#### 12. 将 Trunk 同步 上线生产环境 www.qbless.com

##Ngnx Conf

```
server {
    listen 80;

    server_name ~^(.+)?\.dev\.qbless\.com$;

    set $branche $1;

    root /website/www.qbless.com/branches/$branche/apps/;

    index index.php;

    location ~\.php?$ {

        fastcgi_pass  php_cgi_53;

        fastcgi_index index.php;

        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;

        include fastcgi.conf;
    }
}


server {
    listen 80;

    server_name ~^(.+)?\.dev\.qbimg\.com$;

    set $branche $1;

    root /website/www.qbless.com/branches/$branche/asset/;

    index index.html;

    autoindex on;
}
```

##Scaffold

根据分支过过程中

Branches/{branche}/apps/default/config/*.php 经常修改的地方，进行正则匹配替换。

Database 自动创建 db_{branche} 并且将 trunk db 复制一份最新到分支

罗列出所有分支，方便跳转开发、自测。避免多分支多域名消耗记忆存储空间
