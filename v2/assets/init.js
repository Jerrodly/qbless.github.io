//获取根路径放到全局对象G里面
var tmp = {}, G = {};
tmp.scripts = document.scripts;
tmp.current = tmp.scripts[tmp.scripts.length - 1];
G.baseUrl = tmp.current.src.substring(0, tmp.current.src.lastIndexOf('init.js'));
tmp = {}; //释放

//seajs 配置
seajs.config({
  base  : G.baseUrl,
  alias : {
    'jquery' : 'lib/jquery.min',
    'marked' : 'lib/marked.min',
    'cookie' : 'lib/cookie.min'
  }
});
