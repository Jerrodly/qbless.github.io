define(function (require, exports, module) {
  $ = require('jquery');
  marked = require('marked');

  //根据URL判断加载页面
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
  
  //DELAYED LOAD
  setTimeout(function() {
    //LOAD CNZZ
    $.getScript("http://s95.cnzz.com/stat.php?id=1253192811");

    //Load DUOSUO
    window.duoshuoQuery = {short_name:"qbless"};
    $('body').append('<div class="ds-thread" data-thread-key="'+page+'" data-title="'+window.document.title+'" data-url="'+window.location.href+'"></div>');
    $.getScript("http://static.duoshuo.com/embed.js");

  }, 3*1000);
});
