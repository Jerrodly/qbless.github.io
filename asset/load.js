define(function (require, exports, module) {
  $ = require('jquery');
  marked = require('marked');
  Cookie = require('cookie');

  //ACCORDING TO IDENTIFY THE PAGE URL
  var page;
  page = window.location.href.split(window.location.host)[1].substr(1);
  page = page.indexOf('.') < 0 ? page : page.substr(0, page.indexOf('.'));
  page = page.indexOf('?') < 0 ? page : page.substr(0, page.indexOf('?'));
  page = page.indexOf('#') < 0 ? page : page.substr(0, page.indexOf('#'));
  page = page || 'index';

  //LOAD ARTICLE
  require.async('md/'+page+'.md', function(content) {
    $('body').html(marked(content));
  });

  //LOAD CSS
  require.async('theme/dark.min.css');
  
  //DELAYED LOAD
  setTimeout(function() {
    var categorys = {};

    if ('index' == page) {
      $('a[href^="/#"]').each(function(){
        var category = this.href.split('#')[1];
        $(this).parents('li').addClass('category_'+category);

        if (!category) return;
        if (categorys[category] >= 0) {
          categorys[category] += 1;
        } else {
          categorys[category] = 1;
        }
      }).parents('li').addClass('category');

      Cookie.set('categorys', JSON.stringify(categorys));
    } else {
      var c;
      if (c = Cookie.get('categorys')) {
        categorys = JSON.parse(c);
      }
    }

    var menu = '<div class="menu"><ul><li><a href="/#">home</a></li>';
    for(var category in categorys) {
      menu += '<li><a href="/#'+category+'">'+category.toLowerCase()+' ('+categorys[category]+')</a></li>';
    }
    menu += '</ul></div>';
    $('body').append(menu);

    $('.menu').css('position', 'absolute')
              .css('top', '71px')
              .css('right', '71px')
              .css('text-align', 'right');
    $('.menu ul').css('list-style', 'none');

    if ('index' == page) {
      $('a[href^="/#"]').off('click').on('click', function(){
        var i;
        if (i = this.href.split('#')[1]) {
          $('.category').hide();
          $('.category_'+i).show();
        } else {
          $('.category').show();
        }
      });
      window.location.hash.substr(1) && $('.menu a[href="/#'+window.location.hash.substr(1)+'"]').click();
    } else {
      $('title').html($('h1').text() + ' - ' + $('title').html());

      $('h2,h4').each(function() {
        $(this).html('<a href="#'+$(this).attr('id')+'">'+$(this).html()+'</a>');
        $(this).click(function() {
          $('html,body').animate({scrollTop: $(this).offset().top});
        });
      });
      window.location.hash.substr(1) && $('#'+window.location.hash.substr(1)).click();
    }

    //NON-SITE ADDRESS, OPEN A NEW PAGE
    $('a').each(function() {
      if (this.href.indexOf(window.location.host) < 0) {
        $(this).attr('target', '_blank');
      }
    });

    //LOAD CNZZ
    $.getScript("http://s95.cnzz.com/stat.php?id=1253192811");

    //Load DUOSUO
    window.duoshuoQuery = {short_name:"qbless"};
    $('body').append('<div class="ds-thread" data-thread-key="'+page+'" data-title="'+window.document.title+'" data-url="'+window.location.href+'"></div>');
    $.getScript("http://static.duoshuo.com/embed.js");

  }, 3*1000);
});
