define(["require","exports","module"],function(e,t,n){var r={get:function(e){return tmp=document.cookie.match(new RegExp(e+"=[a-zA-Z0-9.()=|%/_-]+($|;)","g")),!tmp||!tmp[0]?null:unescape(tmp[0].substring(e.length+1,tmp[0].length).replace(";",""))||null},set:function(e,t,n,r,i,s){return cookie=[e+"="+escape(t),"path="+(!r||r==""?"/":r),"domain="+(!i||i==""?window.location.hostname:i)],n&&cookie.push("expires="+secondsToExpireDate(n)),s&&cookie.push("secure"),document.cookie=cookie.join("; ")},del:function(e,t,n){t=!t||typeof t!="string"?"":t,n=!n||typeof n!="string"?"":n,get(e)&&set(e,"","Thu, 01-Jan-70 00:00:01 GMT",t,n)},secondsToExpireDate:function(e){return parseInt(e)=="NaN"?"":(now=new Date,now.setTime(now.getTime()+parseInt(e)*1e3),now.toGMTString())}};return r});