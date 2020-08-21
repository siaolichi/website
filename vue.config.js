const PUBLIC_PATH = 'https://s3.eu-central-1.amazonaws.com/hsiao-li-chi.com/';
const ASSETS_PATH = process.env.NODE_ENV === 'production' ? PUBLIC_PATH : '/';
module.exports = {
	// configureWebpack: config => {},
	filenameHashing: false,
	productionSourceMap: false,
	integrity: false,
	publicPath: ASSETS_PATH,
	chainWebpack: config => {
		// 'src/lib' 目录下为外部库文件，不参与 eslint 检测
		config.module
			.rule('eslint')
			.exclude.add('/Users/maybexia/Downloads/FE/community_built-in/src/lib')
			.end();

		config.module
			.rule('images')
			.use('image-webpack-loader')
			.loader('image-webpack-loader')
			.options({
				bypassOnDebug: true
			})
			.end();
	},
	configureWebpack: {
		module: {
			rules: [
				{
					test: /\.(glsl|vs|fs)$/,
					loader: 'shader-loader',
					options: {
						glsl: {
							chunkPath: Promise.resolve('/glsl/chunks')
						}
					}
				}
			]
		},
		optimization: {
			splitChunks: false
		}
	}
};
