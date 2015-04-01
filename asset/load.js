define(function (require, exports, module) {
  $ = require('jquery');

  //根据URL判断加载页面
  var page = window.location.href.split(window.location.host)[1].substr(1) || 'index';
  
  //先加载marked类
  require.async('marked', function() {
    //再加载样式
    require.async('theme/base.min.css', function(content) {
      require.async('md/'+page+'.md', function(content) {
        $('body').html(marked(content));
  
        //LOAD CNZZ
        $.getScript("http://s95.cnzz.com/stat.php?id=1253192811");
        
        //Load DUOSUO
        window.duoshuoQuery = {short_name:"qbless"};
        setTimeout(function(){$('body').append('<div class="ds-thread" data-thread-key="'+page+'" data-title="'+window.document.title+'" data-url="'+window.location.href+'"></div>');$.getScript("http://static.duoshuo.com/embed.js");}, 3*1000);
      });
    });
  });
});
