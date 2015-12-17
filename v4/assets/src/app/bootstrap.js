define(['jquery', 'marked', 'hljs', 'database'], function($, marked, hljs, db) {
	var G = {};

	G.hashbang = '#!/';
	G.article = '';
	G.get = {};


	/**
	 * 首字母大写
	 */
	var ucfirst = function(str) {
		str = str.toLowerCase();
		var arr = str.split(' ');
		var res = [];
		for (var i in arr) {
			res.push(arr[i].substring(0,1).toUpperCase() + arr[i].substring(1));
		}
		return res.join(' ');
	}


	/**
	 * 初始化
	 */
	var init = function() {
		var str='', arr=[], arr1=[], arr2=[];


		//structure
		$('body').append('<div class="header"></div>');
		$('body').append('<div class="main"></div>');
		$('body').append('<div class="side"></div>');
		$('body').append('<div class="footer"></div>');

		$('.main').append('<div class="content"></div>');
		$('.main').append('<div class="comments"></div>');

		$('.side').append('<div class="archives"></div>');
		$('.side').append('<div class="tags"></div>');
		$('.side').append('<div class="dates"></div>');
		$('.side').append('<div class="links"></div>');
		$('.side').append('<div class="tools"></div>');
		$('.side').append('<div class="about"></div>');


		//info
		$('.header').append('<h1><a href="' + G.hashbang + '">' + db.info.title + '</a></h1>');
		$('.header').append('<p>' + db.info.intro + '</p>');


		//archives
		var dates = db.model.dates('y');
		arr = [];
		for (i in dates) {
			arr.push('<a href="' + G.hashbang + '?archives=all&date=' + i + '" title="Including ' + dates[i] + ' articles.">' + ucfirst(i) + '</a> (' + dates[i] + ')');
		}
		arr.push('<a href="' + G.hashbang + '?archives=all">21st century</a> (' + Object.keys(db.articles).length + ')');
		$('.archives').append('<h4>Archives</h4>');
		$('.archives').append(arr.reverse().join('<br/>'));


		//tags
		var tags = db.model.tags();
		arr = [];
		for (i in tags) {
			arr.push('<a href="' + G.hashbang + '?tag=' + i + '" title="Including ' + tags[i] + ' articles.">' + ucfirst(i) + '</a> (' + tags[i] + ')');
		}
		$('.tags').append('<h4>Tags</h4>');
		$('.tags').append(arr.join('<br/>'));


		//dates
		var dates = db.model.dates('ym');
		arr = [];
		for (i in dates) {
			arr.push('<a href="' + G.hashbang + '?date=' + i + '" title="Including ' + dates[i] + ' articles.">' + ucfirst(i) + '</a> (' + dates[i] + ')');
		}
		$('.dates').append('<h4>Dates</h4>');
		$('.dates').append(arr.join('<br/>'));


		//links
		arr = [];
		for (i in db.links) {
			arr.push('<a href="' + db.links[i]['link'] + '">' + db.links[i]['title'] + '</a>');
		}
		$('.links').append('<h4>Links</h4>');
		$('.links').append(arr.join('<br/>'));


		//tools
		arr = [];
		for (i in db.tools) {
			arr2 = [];
			for (j in db.tools[i]) {
				arr2.push('<a href="' + db.tools[i][j]['link'] + '">' + db.tools[i][j]['name'] + '</a>');
			}
			arr.push(ucfirst(i) + ': ' + arr2.join(' | '));
		}
		$('.tools').append('<h4>Tools</h4>');
		$('.tools').append(arr.join('<br/>'));
		
		
		//about
		$('.about').append('<h4>About</h4>');
		$('.about').append('<p>' + db.about.whoami + '</p>');
		$('.about').append('<p>Weibo: <a href="http://weibo.com/n/' + db.about.weibo + '">@' + db.about.weibo + '</a></p>');
		$('.about').append('<p>Skill: ' + db.about.skill.join(' ') + '</p>');
		
		str = '';
		arr = [];
		for (i in db.about.work) {
			arr.push('<a href="' + db.about.work[i]['site'] + '">' + db.about.work[i]['company'] + '</a> (' + db.about.work[i]['cycle'] + ')');
		}
		str += '<p>Work: <br/>';
		str += arr.join('<br/>');
		str += '</p>';
		$('.about').append(str);


		//footer
		$('.footer').append('<p>Powered by @Kirin_Woo</p>');


		//css
		if (navigator.userAgent.indexOf('iPhone') >= 0 || navigator.userAgent.indexOf('Android') >= 0) {
			$('head').append('<meta name="viewport" content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width">');
			$('body').addClass('markdown-body').css({'margin': '16px'});
		} else {
			$('body').addClass('markdown-body').css({'margin': '64px'});
			$('.main').css({'width': '80%', 'float': 'left'});
			$('.side').css({'width': '19%', 'float': 'right'});
			$('.footer').css({'width': '100%', 'float': 'right', 'text-align': 'center'});
		}
	}


	/**
	 * 通过HASH获取参数
	 */
	var param = function() {
		G.article = '';
		G.get = {};

		G.article = location.hash.replace(G.hashbang, '');
		G.article = G.article.indexOf('?') >= 0 ? G.article.substr(0, G.article.indexOf('?')) : G.article;

		pairs = location.hash.indexOf('?') >= 0 ? location.hash.split('?')[1].split('&') : '';
		if ('' != pairs) {
			var arg, val, pos;
			for(var i = 0; i < pairs.length; i++) {
				pos = pairs[i].indexOf('=');
				i
				if (pos == -1) continue;
				
				arg = pairs[i].substring(0, pos);
				val = decodeURIComponent(pairs[i].substring(pos+1));
				
				G.get[arg] = val;
			}
		}
	}


	/**
	 * 获取文章描述
	 */
	var description = function(article) {
		var content = article.split('\n').slice(0, 20).join('\n');
		content += '\n...';
		((content.split('```').length-1) % 2) && (content += '\n```');
		return content;
	}


	/**
	 * 文章块
	 */
	var block = function(shortof, content) {
		var html = '';

		html += '<h2><a href="' + G.hashbang + shortof + '">' + db.articles[shortof]['title'] + '</a></h2>';
		html += '<p>';
		html += db.articles[shortof]['date'];
		html += ' ';
		arr = [];
		for (i in db.articles[shortof]['tags']) {
			arr.push('<a href="' + G.hashbang + '?tag=' + db.articles[shortof]['tags'][i] + '">' + ucfirst(db.articles[shortof]['tags'][i]) + '</a>');
		}
		html += arr.join(' | ');
		html += '</p>';
		html += marked(content);

		return html;
	}


	/**
	 * 展示
	 */
	var display = function(dom, content) {
		$(dom).html(content);

		$('pre code').each(function(i, block) {
			hljs.highlightBlock(block);
		});

		$('.side a,.content a').each(function() {
			if ($(this).attr('href').indexOf('/') == 0) {
				$(this).attr('href', $(this).attr('href').replace('/', G.hashbang));
			} else if (this.href.indexOf(location.host) < 0) {
				$(this).attr('target', '_blank');
			}
		});
	}


	/**
	 * 列表
	 */
	var list = function() {
		G.get.page = parseInt(G.get.page) || 1;

		var articles = db.model.articles(G.get.page, db.setting.list.number, G.get.tag, G.get.date);

		if (!articles.list.length) {
			$('.content').html('<h3>Not Found</h3>');
			return;
		}

		var files = [];
		for (i in articles.list) {
			files.push('text!' + db.setting.article.path + articles.list[i] + db.setting.article.suffix);
		}

		require(files, function(c0, c1, c2, c3, c4, c5, c6, c7, c8, c9) {
			var content = '', arr = [], html = '';
			for (i in articles.list) {
				switch(parseInt(i)) {
					case 0:
						content = description(c0);
						break;
					case 1:
						content = description(c1);
						break;
					case 2:
						content = description(c2);
						break;
					case 3:
						content = description(c3);
						break;
					case 4:
						content = description(c4);
						break;
					case 5:
						content = description(c5);
						break;
					case 6:
						content = description(c6);
						break;
					case 7:
						content = description(c7);
						break;
					case 8:
						content = description(c8);
						break;
					case 9:
						content = description(c9);
						break;
				}

				html += block(articles.list[i], content);
				html += '<a <a href="' + G.hashbang + articles.list[i] + '">➥Read More</a>';
			}

			//分页
			arr = [];
			(G.get.tag) && arr.push('tag=' + G.get.tag);
			(G.get.date) && arr.push('date=' + G.get.date);
			arr.push('page=');
			html += '<p class="pages">';
			html += '<a href="' + G.hashbang + '?' + arr.join('&') + ((G.get.page - 1) || G.get.page) + '">PREV</a>';
			html += '<a href="' + G.hashbang + '?' + arr.join('&') + ((articles.total > G.get.page*db.setting.list.number) ? (G.get.page + 1) : G.get.page) + '" style="float: right;">NEXT</a>';
			html += '</p>';

			display('.content', html);
		});
	}


	/**
	 * 文章
	 */
	var article = function() {
		require(['text!' + db.setting.article.path + G.article + db.setting.article.suffix], function(content) {
			display('.content', block(G.article, content));
			$('title').html($('h2').text() + ' - ' + db.info.title);
		});
	}


	/**
	 * 归档
	 */
	var archives = function() {
		var html = '', arr = [], shortof= ' ', articles = db.model.articles(1, 999, G.get.tag, G.get.date);
		for (i in articles.list) {
			arr = [];
			shortof = articles.list[i]
			for (j in db.articles[shortof]['tags']) {
				arr.push('<a href="' + G.hashbang + '?tag=' + db.articles[shortof]['tags'][j] + '">#' + ucfirst(db.articles[shortof]['tags'][j]) + '#</a>');
			}
			html += '<h6>' + db.articles[shortof]['date'] + ' <a href="' + G.hashbang + shortof + '">' + db.articles[shortof]['title'] + '</a> ' + arr.join(' ') + '</h6>'
		}
		display('.content', html);
	}


	/**
	 * 评论
	 */
	var comments = function(key, title, url) {
		//duoshuo
		window.duoshuoQuery = {short_name: db.setting.comments.duoshuo};
		$.getScript("http://static.duoshuo.com/embed.js", function() {
			if (!$('.ds-thread').length) {
				var el = document.createElement('div');
				el.setAttribute('class', 'ds-thread');
				el.setAttribute('data-thread-key', key);
				el.setAttribute('data-title', title);
				el.setAttribute('data-url', url);
				window.DUOSHUO.EmbedThread(el);
				$('.comments').append(el);
			}
		});
	}


	/**
	 * 统计
	 */
	var stat = function() {
		//cnzz
		$.getScript("http://s95.cnzz.com/stat.php?id=" + db.setting.stat.cnzz);
	}


	/**
	 * 调度
	 */
	var dispatch = function() {
		param();

		$('title').html(db.info.title);
		$('.content').html('Loading...');
		$('.comments').html('');
		$('html,body').animate({scrollTop: 0});

		if (G.article && db.articles[G.article]) {
			article();
			comments(G.article, document.title, location.href);
		} else if (G.get.archives && 'all' == G.get.archives) {
			archives();
			comments('archives', document.title, location.href);
		} else {
			list();
			comments('index', document.title, location.href);
		}
		//stat();
	}


	/**
	 * 执行
	 */
	var run = function() {
		init();
		dispatch();

		location.origin = location.protocol + '//' + location.hostname;
		('onhashchange' in window && 'addEventListener' in window && 'function' == typeof window.addEventListener) && (window.onhashchange = dispatch);
	}();
});