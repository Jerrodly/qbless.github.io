document.write('<img id="MenuShow" src="http://www.iconpng.com/png/windows8_icons2/bill.png" style="position: fixed; right: 7%; bottom: 100px; z-index: 998;width: 5%;">');
document.write('<div id="MenuList" style="display: none;"><ul><li><a href="/">Home</a></li><li><a href="/#windows">windows</a></li></ul></div>');


//LOAD MENU
//var z = document.createElement('img');
//z.setAttribute("src", "http://www.iconpng.com/png/windows8_icons2/bill.png");
//z.setAttribute("style", "position: fixed; right: 7%; bottom: 100px; z-index: 998;width: 7%;");
//z.setAttribute("id", "MenuShow");
//document.getElementsByTagName("body")[0].appendChild(z);



//LOAD JQUERY
//var z = document.createElement('script');
//z.setAttribute("type", "text/javascript");
//z.setAttribute("charset", "utf-8");
//z.setAttribute("src", "http://code.jquery.com/jquery-2.1.1.min.js");
//document.getElementsByTagName("head")[0].appendChild(z);




//LOAD SIDR
var z = document.createElement('link');
z.setAttribute("rel", "stylesheet");
z.setAttribute("type", "text/css");
z.setAttribute("href", "http://raw.githubusercontent.com/artberri/sidr/master/dist/stylesheets/jquery.sidr.dark.css");
document.getElementsByTagName("head")[0].appendChild(z);

var z = document.createElement('script');
z.setAttribute("type", "text/javascript");
z.setAttribute("charset", "utf-8");
z.setAttribute("src", "http://rawgithub.com/artberri/sidr/master/src/jquery.sidr.js");
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
      if (_a.href.split("#")[1]) {
        $(_a).unbind('click').bind('click', function(){
          ArticleCategory(_a.href.split("#")[1]);
        });
      }
    }
    
    if (window.location.href.indexOf('/#') > 0) {
      ArticleCategory(window.location.href.split("#")[1]);
    }
  }
}
