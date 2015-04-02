define(function (require, exports, module) {
  $ = require('jquery');
  marked = require('marked');

  //ACCORDING TO IDENTIFY THE PAGE URL
  var page;
  page = window.location.href.split(window.location.host)[1].substr(1);
  page = page.indexOf('.html') < 0 ? page : page.substr(0, page.indexOf('.html'));
  page = page.indexOf('#') < 0 ? page : page.substr(0, page.indexOf('#'));
  page = page || 'index';

  //LOAD ARTICLE
  require.async('md/'+page+'.md', function(content) {
    $('body').html(marked(content));
  });

  //LOAD CSS
  require.async('theme/base.min.css');
  
  var category = function(name) {
    if (!name) {
      $('a[href^="/#"]').parents('li').show();
    } else {
      $('a[href^="/#"]').parents('li').hide();
      $('a[href^="/#"]').each(function() {
        if (this.href.indexOf(name) > 0) {
          $(this).parents('li').show();
        }
      })
    }
  }
  
  //DELAYED LOAD
  setTimeout(function() {

    if ('index' == page) {
      if (window.location.hash.substr(1)) {
        category(window.location.hash.substr(1));
      }
      $('a[href^="/#"]').click(function(){category(this.href.split('#')[1])});
    } else {
      $('title').html($('h1').html() + ' - ' + $('title').html());
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
