
//LOAD MENU LIST
var z = document.createElement('img');
z.setAttribute("src", "http://h.hiphotos.bdimg.com/album/w%3D2048/sign=e7b63288ac4bd11304cdb0326e97a50f/2f738bd4b31c87018ea8641d267f9e2f0708ff2b.jpg");
z.setAttribute("id", "MenuShow2");
document.getElementsByTagName("body")[0].appendChild(z);



//LOAD MENU IMAGE
//var z = document.createElement('img');
//z.setAttribute("src", "http://h.hiphotos.bdimg.com/album/w%3D2048/sign=e7b63288ac4bd11304cdb0326e97a50f/2f738bd4b31c87018ea8641d267f9e2f0708ff2b.jpg");
//z.setAttribute("style", "position: fixed; right: 7%; bottom: 100px; z-index: 998;width: 7%;");
//z.setAttribute("id", "MenuShow");
//document.getElementsByTagName("body")[0].appendChild(z);

document.write('<img id="MenuShow" src="http://h.hiphotos.bdimg.com/album/w%3D2048/sign=e7b63288ac4bd11304cdb0326e97a50f/2f738bd4b31c87018ea8641d267f9e2f0708ff2b.jpg" style="position: fixed; right: 7%; bottom: 100px; z-index: 998;width: 7%;">');
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
document.getElementsByTagName("head")[0].appendChild(z);




$(document).ready(function() {
$('#MenuShow').sidr({
  name: 'MenuList'
});
});

