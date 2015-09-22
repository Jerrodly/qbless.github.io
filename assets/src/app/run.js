define(['jquery', 'marked', 'lib/cookie'], function($, marked, Cookie) {
	var
	defpage = 'index',
	hashbang = '#!/',
	hashbang_length = hashbang.length,
	tag_prefix = hashbang+'tag=',
	tag_prefix_length = tag_prefix.length,
	is_mobile = (navigator.userAgent.indexOf('iPhone') >=0 || navigator.userAgent.indexOf('Android') >=0) ? true : false,
	nav_tag_show_num = is_mobile ? 4 : 8;
	
	var article = function() {
		var params = {}, total = 0, tags = {};
		
		params.page = location.hash.indexOf(hashbang) >= 0 && location.hash.indexOf(tag_prefix) < 0 && location.hash.substr(2) || defpage;
		params.tag  = location.hash.indexOf(tag_prefix) >= 0 && location.hash.substr(tag_prefix_length) || '';
		
		$('body').html('Loading...');
		
		require(['text!/data/articles/'+params.page+'.md'], function(content) {
			$('body').html(marked(content));
			
			$("a[href^='/']").each(function() {
				if (this.href.indexOf('#') >= 0) {
					var tag = this.href.substr(location.origin.length + 2)
					this.href = tag_prefix + tag;
					if ('index' == params.page) {
						$(this).parents('li').addClass('tag_' + tag);
						
						if (tag) {
							tags[tag] = tags[tag] || 0;
							tags[tag] += 1;
						}
					}
					
				} else {
					this.href = hashbang + this.href.substr(location.origin.length + 1);
					
					if ('index' == params.page) {
						total += 1;
					}
				}
				if ('index' == params.page) {
					Cookie.set('tags', JSON.stringify(tags));
					Cookie.set('total', total);
				}
				
				$(this).off('click').on('click', function () {
					location.hash = this.href.split('#')[1];
					article();
				});
			});
			
			if ('index' == params.page) {
				$("a[href^='"+tag_prefix+"']").parents('li').addClass('tags');
				
				if (params.tag.length) {
					$('.tags').hide();
					$('.tag_' + params.tag).show();
				} else {
					$('.tags').show();
				}
			} else {
				var c;
				if (c = Cookie.get('tags')) {
					tags = JSON.parse(c);
				}
				total = Cookie.get('total');
			}
			
			$("a[href^='"+tag_prefix+"']").css({'color': '#aaa'});
			$('title').html(('index' != params.page ? ($('h1').text() + ' - ') : '') + 'Kirin\'s Blog');
			
			var menu = '<div class="nav menu"><ul><li><a href="#" title="Including ' + total + ' articles.">HOME</a></li>';
			for (var tag in tags) {
				menu += '<li><a href="' + tag_prefix + tag + '" title="Including ' + tags[tag] + ' articles.">' + tag.toUpperCase() + '</a></li>';
			}
			menu +=	'</ul></div>';
			$('body').append(menu);
			if ($('.nav li').slice(nav_tag_show_num).length) {
				$('.nav li').slice(nav_tag_show_num).hide();
				$('.nav ul').append('<li><a href="javascript:;" title="Show tags.">...</a></li>');
				$('.nav li').last().on('click', function(){$('.nav li').slice(nav_tag_show_num).toggle();});
			}
			$('.nav').css({'position': 'fixed', 'top': '0px', 'left': '0px', 'width': '100%', 'z-index': '998', 'background': '#eee', 'font-weight': 'bold'});
			$('.nav ul').css({'list-style': 'none'});
			$('.nav li').css({'float': 'left', 'padding': '6px'});
			
			if ($('.nav').height() > $('body').offset().top) {
				$('body').css({'margin-top': $('.nav').height()+$('body').offset().top});
			}

			$('a').each(function() {
				if (this.href.indexOf(location.host) < 0) {
					$(this).attr('target', '_blank');
				}
			});
			
			setTimeout(function() {
				$.getScript("http://s95.cnzz.com/stat.php?id=1253192811");
				
				if (!$('.ds-thread').length) {
					var el = document.createElement('div');
					el.setAttribute('class', 'ds-thread');
					el.setAttribute('data-thread-key', params.page);
					el.setAttribute('data-title', document.title);
					el.setAttribute('data-url', location.href);
					window.DUOSHUO.EmbedThread(el);
					$('body').append(el);
				}
			}, 3 * 1000);
			
			$('html,body').animate({scrollTop: 0});
		});
		
		
	}
	
	location.origin = location.protocol + '//' + location.hostname;
	
	if ('onhashchange' in window && 'addEventListener' in window && 'function' == typeof window.addEventListener) {
		window.onhashchange = article;
	}
	article();
	
	if (is_mobile) {
		$('head').append('<meta name="viewport" content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width">');
		$('body').addClass('markdown-body').css({'margin': '16px'});
	} else {
		$('body').addClass('markdown-body').css({'margin': '64px'});
	}
	
	window.duoshuoQuery = {short_name: "qbless"};
	$.getScript("http://static.duoshuo.com/embed.js");
});