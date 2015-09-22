//eg: https://github.com/jrburke/r.js/blob/master/build/example.build.js
({
	dir : '../dist',
	appDir : '../src',
	baseUrl : '.',
	mainConfigFile : '../src/conf/require.js',
	preserveLicenseComments : false,
	modules : [
		{
			name : 'requirejs-text-jquery-marked-cookie-run',
			include : [
				'lib/requirejs/2.1.20',
				'conf/require',
				'conf/dist',
				'text',
				'jquery',
				'marked',
				'lib/cookie',
				'app/run'
			],
			insertRequire : ['app/run'],
			create : true
		}
	]
});
