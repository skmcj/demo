import type { Configuration } from 'webpack';

import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';
import path from 'path';

export const mainConfig: Configuration = {
  /**
   * 应用的主入口，主进程第一个运行的脚步
   */
  entry: './src/index.ts',
  // 做一些普通的 webpack 配置
  module: {
    rules
  },
  plugins,
  resolve: {
    // 配置主进程路径别名
    alias: {
      '@src': path.resolve(__dirname, './src')
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json']
  }
};
