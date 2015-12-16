;(function() {



var base = {
	//文章 //缩写 //标题 //日期 //标签
	'articles' : {
		'demo' : {
			'title' : 'Demo',
			'date' : '2015-10-24',
			'tags' : ['tag']
		},
		'demo2' : {
			'title' : 'Demo2',
			'date' : '2015-10-24',
			'tags' : ['tag2']
		},
	},
	//信息
	'info' : {
		//标题
		'title' : 'Title',
		//简介
		'intro' : 'Introduction'
	},
	//关于
	'about' : {
		//我是谁
		'whoami' : 'Whoami',
		//微博
		'weibo' : 'weibo',
		//技能
		'skill' : [
			'...'
		],
		//就职于
		'work' : [
			{
				'company' : 'Baidu',
				'site' : 'http://www.baidu.com/',
				'cycle' : '1234.5.6 - now'
			}
		]
	},
	//友链
	'links' : [
		{
			//标题
			'title' : 'Baidu',
			//链接
			'link' : 'https://www.baidu.com/'
		}
	],
	//设置
	'setting' : {
		//列表
		'list' : {
			//数量(每页)
			'number' : 7 
		},
		//文章
		'article' : {
			//路径
			'path' : '/data/articles/',
			//后缀
			'suffix' : '.md'
		},
		//评论
		'comments' : {
			//多说
			'duoshuo' : 'qbless'
		}
	},
	//模型
	'model' : {}
};

/**
 * 获取所有标签
 * @return object
 */
base.model.tags = function() {
	var arr = {};
	for (i in base.articles) {
		for (j in base.articles[i]['tags']) {
			(arr[base.articles[i]['tags'][j]]) ? (arr[base.articles[i]['tags'][j]] += 1) : (arr[base.articles[i]['tags'][j]] = 1);
		}
	}
	return arr;
}

/**
 * 获取所有月份
 * @return object
 */
base.model.dates = function() {
	var arr = {}, ym='';
	for (i in base.articles) {
		ym = base.articles[i]['date'].substr(0,7);
		(arr[ym]) ? (arr[ym] += 1) : (arr[ym] = 1);
	}
	return arr;
}

/**
 * 获取文章
 */
base.model.articles = function(cur, num, tag, date) {
	var res = {}; list = [], total = 0, start = (cur-1)*num, end = cur * num;
	for (i in base.articles) {
		if (tag && base.articles[i]['tags'].indexOf(tag) < 0) {
			continue;
		}
		if (date && date != base.articles[i]['date'].substr(0,7)) {
			continue;
		}
		if (start<= total && total < end) {
			list.push(i);
		}
		++total;
	}
	res.list = list;
	res.total = total;
	return res;
}


if (typeof define === 'function' && define.amd) {
	define(function() { return base; });
}



}());