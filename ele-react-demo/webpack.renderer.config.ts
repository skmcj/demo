import type { Configuration } from 'webpack';

import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';
import path from 'path';

// 配置 scss 的 loader
rules.push({
  test: /\.(sass|scss|css)$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' }]
});

// 如果有其它文件的 loader 也可在此处配置

export const rendererConfig: Configuration = {
  module: {
    rules
  },
  plugins,
  resolve: {
    // 配置渲染进程路径别名
    alias: {
      '@src': path.resolve(__dirname, './src')
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css']
  }
};
