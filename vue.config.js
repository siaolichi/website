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
	},
	// 配置高于chainWebpack中关于 css loader 的配置
	css: {
		// 是否开启支持 foo.module.css 样式
		modules: false,

		// 是否使用 css 分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用 <style> 方式内联至 html 文件中
		extract: false,

		// 是否构建样式地图，false 将提高构建速度
		sourceMap: false,

		// css预设器配置项
		loaderOptions: {
			css: {
				// options here will be passed to css-loader
			},

			postcss: {
				// options here will be passed to postcss-loader
			}
		}
	}
};
