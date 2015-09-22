define(function(require, exports, module) {
	var Cookie = {
		get: function(key) {
			tmp = document.cookie.match((new RegExp(key + "=[a-zA-Z0-9.()=|%/_-]+($|;)", "g")));
			if (!tmp || !tmp[0]) {
				return null
			} else {
				return unescape(tmp[0].substring(key.length + 1, tmp[0].length).replace(";", "")) || null
			}
		},
		set: function(key, value, ttl, path, domain, secure) {
			cookie = [key + "=" + escape(value), "path=" + ((!path || path == "") ? "/" : path), "domain=" + ((!domain || domain == "") ? window.location.hostname : domain)];
			if (ttl) {
				cookie.push("expires=" + secondsToExpireDate(ttl))
			}
			if (secure) {
				cookie.push("secure")
			}
			return document.cookie = cookie.join("; ")
		},
		del: function(key, path, domain) {
			path = (!path || typeof path != "string") ? "" : path;
			domain = (!domain || typeof domain != "string") ? "" : domain;
			if (get(key)) {
				set(key, "", "Thu, 01-Jan-70 00:00:01 GMT", path, domain)
			}
		},
		secondsToExpireDate: function(ttl) {
			if (parseInt(ttl) == "NaN") {
				return ""
			} else {
				now = new Date();
				now.setTime(now.getTime() + (parseInt(ttl) * 1000));
				return now.toGMTString()
			}
		}
	};
	
	return Cookie;
});