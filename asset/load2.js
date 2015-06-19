define(function (require, exports, module) {
  $ = require('jquery');
  marked = require('marked');
  Cookie = require('cookie');

  require.async('theme/dark.min.css');

  window.duoshuoQuery = {short_name: "qbless"};
  $.getScript("http://static.duoshuo.com/embed.js");

  var article = function() {
    var params = {}
    params.page = location.hash.indexOf('#!') >= 0 && location.hash.indexOf('#!tag') < 0 && location.hash.substr(2) || 'index';
    params.tag  = location.hash.indexOf('#!tag=') >= 0 && location.hash.substr(6) || '';

    var tags = {};

    $('body').html('Loading...');
    require.async('md/'+params.page+'.md', function (content) {
      $('body').html(marked(content));

      $("a[href^='/']").each(function() {

        if (this.href.indexOf('#') >= 0) {
          var tag = this.href.substr(location.href.length + 1)
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
          this.href = '#!' + this.href.substr(location.href.length);
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
          menu += '<li><a href="#!tag=' + tag + '">' + tag + ' (' + tags[tag] + ')</a></li>';
          total += tags[tag];
      }
      menu = '<div class="menu"><ul><li><a href="#">home('+total+')</a></li>' + menu + '</ul></div>';
      $('body').append(menu);
      $('.menu').css('position', 'absolute').css('top', '71px').css('right', '71px').css('text-align', 'right');
      $('.menu ul').css('list-style', 'none');

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
