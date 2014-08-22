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

//LOADER
window.onload = function() {

//Append html
$("body").append('\
  <img id="MenuShow" src="http://www.iconpng.com/png/windows8_icons2/bill.png" style="position: fixed; right: 7%; bottom: 100px; z-index: 998;width: 5%;">\
');
$("body").append('\
  <div id="MenuList" style="display: none;"><ul>\
  <li><a href="/#">Home</a></li>\
  <li><a href="/#clutter">clutter</a></li>\
  <li><a href="/#php">php</a></li>\
  <li><a href="/#nginx">nginx</a></li>\
  <li><a href="/#windows">windows</a></li>\
  </ul></div>\
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
} else if (window.location.href.split("/")[3]!='' && window.location.href.indexOf('/#') == -1) {
  //Article page
  
  //Load uyan
  $("body").append('\
    <div id="uyan_frame"></div>\
  ');
  $.getScript("http://v2.uyan.cc/code/uyan.js?uid=1638581");
}

}