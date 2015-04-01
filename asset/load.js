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
  
        //Load DUOSUO
        $.getScript("http://static.duoshuo.com/embed.js");

        //LOAD CNZZ
        $.getScript("http://s95.cnzz.com/stat.php?id=1253192811");
      });
    });
  });
});
