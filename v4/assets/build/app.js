//eg: https://github.com/jrburke/r.js/blob/master/build/example.build.js
({
	dir : '../dist',
	appDir : '../src',
	baseUrl : '.',
	mainConfigFile : '../src/conf/require.js',
	preserveLicenseComments : false,
	modules : [
		{
			name : 'requirejs-text-jquery-marked-bootstrap',
			include : [
				'lib/requirejs/2.1.20',
				'conf/require',
				'conf/dist',
				'text',
				'jquery',
				'marked',
				'app/bootstrap'
			],
			exclude : [
				'database'
			],
			insertRequire : ['app/bootstrap'],
			create : true
		}
	]
});
