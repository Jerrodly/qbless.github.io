//LOAD MENU
//var z = document.createElement('img');
//z.setAttribute("src", "http://img.taopic.com/uploads/allimg/130515/240469-13051523520152.jpg");
//z.setAttribute("style", "position: fixed; right: 7%; bottom: 100px; z-index: 998;width: 7%;");
//z.setAttribute("id", "MenuShow");
//document.getElementsByTagName("body")[0].appendChild(z);

document.write('<img id="MenuShow" src="http://img.taopic.com/uploads/allimg/130515/240469-13051523520152.jpg" style="position: fixed; right: 7%; bottom: 100px; z-index: 998;width: 7%;">');
document.write('<div id="MenuList"><ul><li><a href="/">Home</a></li></ul></div>');



//LOAD JQUERY
var z = document.createElement('script');
z.setAttribute("type", "text/javascript");
z.setAttribute("charset", "utf-8");
z.setAttribute("src", "http://code.jquery.com/jquery-2.1.1.min.js");
document.getElementsByTagName("head")[0].appendChild(z);




//LOAD SIDR
var z = document.createElement('link');
z.setAttribute("rel", "stylesheet");
z.setAttribute("type", "text/css");
z.setAttribute("href", "https://raw.githubusercontent.com/artberri/sidr/master/dist/stylesheets/jquery.sidr.dark.css");
document.getElementsByTagName("head")[0].appendChild(z);

var z = document.createElement('script');
z.setAttribute("type", "text/javascript");
z.setAttribute("charset", "utf-8");
z.setAttribute("src", "https://raw.githubusercontent.com/artberri/sidr/master/src/jquery.sidr.js");
document.getElementsByTagName("body")[0].appendChild(z);




$(document).ready(function() {
$('#MenuShow').sidr({
  name: 'MenuList'
});
});

