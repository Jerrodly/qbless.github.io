define(function (require, exports, module) {
  $ = require('jquery');

  //根据URL判断加载页面
  var page = window.location.href.split(window.location.host)[1].substr(1, 6) || 'index';
  
  //先加载marked类
  require.async('marked', function() {
    //再加载样式
    require.async('theme/base.css', function(content) {
      require.async('md/'+page+'.md', function(content) {
        $('body').html(marked(content));
      });
    });
  });
});
