define(function (require, exports, module) {
  $ = require('jquery');
  marked = require('marked');
  Cookie = require('cookie');

  require.async('theme/github.min.css');
  $('body').addClass('markdown-body').css('width', '1024px').css('margin', '64px auto')

  window.duoshuoQuery = {short_name: "qbless"};
  $.getScript("http://static.duoshuo.com/embed.js");

  var article = function() {
    var params = {}
    params.page = location.hash.indexOf('#!') >= 0 && location.hash.indexOf('#!tag') < 0 && location.hash.substr(2) || 'index';
    params.tag  = location.hash.indexOf('#!tag=') >= 0 && location.hash.substr(6) || '';
    
    location.origin = location.protocol + '//' + location.hostname;

    var tags = {};

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
            Cookie.set('tags', JSON.stringify(tags));
          }
          
        } else {    
          this.href = '#!' + this.href.substr(location.origin.length + 1);
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
      }

      $('title').html(('index' != params.page ? ($('h1').text() + ' - ') : '') + 'Kirin\'s Blog');

      var total = 0, menu = '';
      for (var tag in tags) {
          menu += '<li><a href="#!tag=' + tag + '" title="' + tags[tag] + '">' + tag.toUpperCase() + '</a></li>';
          total += tags[tag];
      }
      menu = '<div class="nav menu"><ul><li><a href="#" title="' + total + '">HOME</a></li>' + menu + '</ul></div>';
      $('body').append(menu);
      $('.nav').css({'position': 'fixed', 'top': '0px', 'width': '1024px', 'z-index': '998', 'background': '#eee'});
      $('.nav li').css({'float': 'left', 'padding': '8px'});
      //$('.menu').css({'position': 'absolute', 'top': '71px', 'right': '71px', 'text-align': 'right'});
      //$('.menu ul').css('list-style', 'none');

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
          el.setAttribute('data-url', location.href);
          window.DUOSHUO.EmbedThread(el);
          $('body').append(el);
        }
      }, 1 * 1000);


      $('html,body').animate({scrollTop: 0});
    });
  }

  if ('onhashchange' in window && 'function' == typeof window.addEventListener) {
    window.onhashchange = article;
  }
  article();
});
