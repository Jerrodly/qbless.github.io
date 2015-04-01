define(function (require, exports, module) {
  $ = require('jquery');

  //根据URL判断加载页面
  var page = window.location.href.split(window.location.host)[1].substr(1) || 'index';
  
  require.async('marked', function() {
    require.async('md/'+page+'.md', function(content) {
      $('body').html(marked(content));
    });
  });
});
