define(function (require, exports, module) {
  $ = require('jquery');
  marked = require('marked');
  Cookie = require('cookie');

  require.async('theme/github.min.css');
  $('body').addClass('markdown-body').css({'margin': '64px'});

  window.duoshuoQuery = {short_name: "qbless"};
  $.getScript("http://static.duoshuo.com/embed.js");

  var article = function() {
    var params = {}
    params.page = location.hash.indexOf('#!') >= 0 && location.hash.indexOf('#!tag') < 0 && location.hash.substr(2) || 'index';
    params.page = params.page.indexOf('.') < 0 ? params.page : params.page.substr(0, params.page.indexOf('.'));
    params.page = params.page.indexOf('?') < 0 ? params.page : params.page.substr(0, params.page.indexOf('?'));
    params.tag  = location.hash.indexOf('#!tag=') >= 0 && location.hash.substr(6) || '';
    
    location.origin = location.protocol + '//' + location.hostname;

    var total = 0, tags = {};

    $('body').html('Loading...');
    require.async('md/'+params.page+'.md', function (content) {
      $('body').html(marked(content));

      $("a[href^='/']").each(function() {

        if (this.href.indexOf('#') >= 0) {
          var tag = this.href.substr(location.origin.length + 2)
          this.href = '#!tag=' + tag;

          if ('index' == params.page) {
            $(this).parents('li').addClass('tag_' + tag);

            if (tag) {
              tags[tag] = tags[tag] || 0;
              tags[tag] += 1;
            }
          }
          
        } else {    
          this.href = '#!' + this.href.substr(location.origin.length + 1);
          
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
        $("a[href^='#!tag=']").parents('li').addClass('tags');

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

      $("a[href^='#!tag=']").css({'color': '#aaa'});
      $('title').html(('index' != params.page ? ($('h1').text() + ' - ') : '') + 'Kirin\'s Blog');

      var menu = '<div class="nav menu"><ul><li><a href="#" title="Including ' + total + ' articles.">HOME</a></li>';
      for (var tag in tags) {
          menu += '<li><a href="#!tag=' + tag + '" title="Including ' + tags[tag] + ' articles.">' + tag.toUpperCase() + '</a></li>';
      }
      menu +=  '</ul></div>';
      $('body').append(menu);
      $('.nav').css({'position': 'fixed', 'top': '0px', 'left': '0px', 'width': '100%', 'z-index': '998', 'background': '#eee'});
      $('.nav ul').css({'list-style': 'none'});
      $('.nav li').css({'float': 'left', 'padding': '8px'});

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

  if ('onhashchange' in window && 'function' == typeof window.addEventListener) {
    window.onhashchange = article;
  }
  article();
});
