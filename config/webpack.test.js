var webpack = require('webpack');
var helpers = require('./helpers');

module.exports = {
	devtool: 'inline-source-map',

	resolve: {
		extensions: ['.ts', '.js']
	},

	module: {
		rules: [
			{
				test:    /\.ts$/,
				loaders: [
					'awesome-typescript-loader',
					'angular2-template-loader',
					'angular2-router-loader'
				]
			},
			{
				test: /\.scss$/,
				exclude: [helpers.root('e2e')],
				use:  [
					{loader: "raw-loader"},
					{
						loader:  "sass-loader",
						options: {
							sourceMap: true
						}
					}
				]
			},
			{
				test:   /\.html$/,
				loader: 'html-loader'

			},
			{
				test:   /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
				loader: 'null-loader'
			},
			{
				test:    /\.css$/,
				exclude: helpers.root('src', 'app'),
				loader:  'null-loader'
			},
			{
				test:    /\.css$/,
				include: helpers.root('src', 'app'),
				loader:  'raw-loader'
			},
			/**
			 * Instruments JS files with Istanbul for subsequent code coverage reporting.
			 * Instrument only testing sources.
			 *
			 * See: https://github.com/deepsweet/istanbul-instrumenter-loader
			 */
			{
				enforce: 'post',
				test:    /\.(js|ts)$/,
				loader:  'istanbul-instrumenter-loader',
				include: helpers.root('src'),
				exclude: [/\.(e2e|spec)\.ts$/]
			}
		]
	},

	plugins: [
		new webpack.ContextReplacementPlugin(
			// The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)@angular/,
			helpers.root('./src'), // location of your src
			{} // a map of your routes
		)
	],

	/**
	 * Disable performance hints
	 *
	 * See: https://github.com/a-tarasyuk/rr-boilerplate/blob/master/webpack/dev.config.babel.js#L41
	 */
	performance: {
		hints: false
	}
};
