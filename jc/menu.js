document.write('/<img id="MenuShow" src="http://www.iconpng.com/png/windows8_icons2/bill.png" style="position: fixed; right: 7%; bottom: 100px; z-index: 998;width: 5%;">');

document.write('\
  <div id="MenuList" style="display: none;"><ul>\
  <li><a href="/">Home</a></li>\
  <li><a href="/#windows">windows</a></li>\
  </ul></div>'\
);


//LOAD SIDR
//http://rawgithub.com/artberri/sidr/master/dist/stylesheets/jquery.sidr.dark.css
var z = document.createElement('link');
z.setAttribute("rel", "stylesheet");
z.setAttribute("type", "text/css");
z.setAttribute("href", "/jc/plugin/sidr/jquery.sidr.dark.min.css");
document.getElementsByTagName("head")[0].appendChild(z);

//http://rawgithub.com/artberri/sidr/master/src/jquery.sidr.js
var z = document.createElement('script');
z.setAttribute("type", "text/javascript");
z.setAttribute("charset", "utf-8");
z.setAttribute("src", "/jc/plugin/sidr/jquery.sidr.min.js");
document.getElementsByTagName("body")[0].appendChild(z);




window.onload = function(){
  $('#MenuShow').sidr({
    name: 'MenuList'
  });
  
  document.oncontextmenu=new Function("$('#MenuShow').click();event.returnValue=false;");


  if (window.location.href == 'http://qbless.github.io/' || window.location.href.indexOf('/#') > 0) {
    var ArticleCategory = function(cate) {
      $('body').children('ul').children('li').hide();

      var articles = $('body').children('ul').children('li');
      for (var i=0; i<articles.length; i++) {
        if ($(articles[i]).html().indexOf(cate)>0) {
          $(articles[i]).show();
        }
      }
      
      return false;
    }
    
    for (var i=0; i<$('a').length; i++) {
      var _a = $('a')[i];
      if (_a.href.split("#")[1]) { $(_a).attr("onclick", "ArticleCategory('"+_a.href.split("#")[1]+"')");
         console.log(_a)
      }
    }
    
    if (window.location.href.indexOf('/#') > 0) {
      ArticleCategory(window.location.href.split("#")[1]);
    }
  }
}
