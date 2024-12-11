import type IForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import path from 'path';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin: typeof IForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

export const plugins = [
  new ForkTsCheckerWebpackPlugin({
    logger: 'webpack-infrastructure'
  }),
  new CopyWebpackPlugin({
    patterns: [
      {
        // 目标文件夹
        from: './src/assets',
        // 将要复制到的位置
        // 此处(renderer)为编译后 Web 部分的内容文件夹
        to: path.join(__dirname, './.webpack/renderer/static'),
        globOptions: {
          // 忽略文件
          // 表示忽略 assets 目录内 logo 子文件夹的所有内容
          ignore: ['**/logo/**']
        }
      }
    ]
  })
];
