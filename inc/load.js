//LOAD MAIN CSS
var z = document.createElement('link');
z.setAttribute("rel", "stylesheet");
z.setAttribute("type", "text/css");
z.setAttribute("href", "/inc/style.css");
document.getElementsByTagName("head")[0].appendChild(z);

//LOAD JQUERY
var z = document.createElement('script');
z.setAttribute("type", "text/javascript");
z.setAttribute("charset", "utf-8");
z.setAttribute("src", "/inc/jquery-2.1.1.min.js");
document.getElementsByTagName("body")[0].appendChild(z);

//Init Article Category Function
function ArticleCategory(cate) {
  if (cate) {
    $('body').children('ul').children('li').hide();
  
    var articles = $('body').children('ul').children('li');
    for (var i=0; i<articles.length; i++) {
      if ($(articles[i]).html().indexOf(cate)>0) {
        $(articles[i]).show();
      }
    }
  } else {
    $('body').children('ul').children('li').show();
  }
  
  return false;
}

//LOADER
window.onload = function() {

//Append html
$("body").append('\
  <img id="MenuShow" src="/inc/menu.png" style="position: fixed; right: 7%; bottom: 100px; z-index: 998;width: 71px;">\
');
$("body").append('\
  <div id="MenuList" style="display: none;"><ul>\
  <li><a href="/#" style="font-size: 71px; text-align: center; height: 60px;">☯</a></li>\
  <li><a href="/#php">┠ php</a></li>\
  <li><a href="/#mysql">┠ mysql</a></li>\
  <li><a href="/#nosql">┠ nosql</a></li>\
  <li><a href="/#linux">┠ linux</a></li>\
  <li><a href="/#windows">┠ windows</a></li>\
  <li><a href="/#clutter">┠ clutter</a></li>\
  <li><a href="/#excerpt">┠ excerpt</a></li>\
  </ul></div>\
');
//$("body").append('\
//<div id="uyan_frame"></div>\
//');
$("body").append('\
  <div class="ds-thread" data-thread-key="'+window.location.href.split("/")[3]+'" data-title="'+window.document.title.substr(0, window.document.title.length-window.document.title.indexOf('Kirin\'s Blog'))+'" data-url="'+window.location.href+'"></div>\
');
$("body").append('\
  <span id=\'cnzz_stat_icon_1253192811\'></span>\
');



//LOAD SIDR
$("<link>").attr({
  rel: "stylesheet",
  type: "text/css",
  href: "/inc/plugin/sidr/jquery.sidr.dark.min.css"
}).appendTo("head");
$.getScript("/inc/plugin/sidr/jquery.sidr.min.js", function() {
  $('#MenuShow').sidr({name: 'MenuList'});
  document.oncontextmenu = new Function("$('#MenuShow').click();event.returnValue=false;return false;");
});



//Home page
if (window.location.href.split("/")[3]=='' || window.location.href.indexOf('/#') > 0) {
  for (var i=0; i<$('a').length; i++) {
    var _a = $('a')[i];
    if (_a.href.indexOf('/#') > 0) {
      $(_a).attr("onclick", "ArticleCategory('"+_a.href.split("#")[1]+"')");
    }
  }
  
  if (window.location.href.indexOf('/#') > 0) {
    ArticleCategory(window.location.href.split("#")[1]);
  }
}

//Load uyan
//$.getScript("http://v2.uyan.cc/code/uyan.js?uid=1638581");

//Load DUOSUO
var duoshuoQuery = {short_name:"qbless"};
$.getScript("http://static.duoshuo.com/embed.js");

//LOAD CNZZ
$.getScript("http://s95.cnzz.com/stat.php?id=1253192811");
}
