import type { ModuleOptions } from 'webpack';

export const rules: Required<ModuleOptions>['rules'] = [
  // 添加对原生 Node 模块的支持
  {
    // We're specifying native_modules in the test because the asset relocator loader generates a "fake" .node file which is really a cjs file.
    // 大致意思是在测试 native_modules 时资源重定位加载器生成了一个“假”的 .node 文件，实际上是一个 cjs 文件；这里主要配置对它的 loader
    test: /native_modules[/\\].+\.node$/,
    use: 'node-loader'
  },
  {
    test: /[/\\]node_modules[/\\].+\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: '@vercel/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules'
      }
    }
  },
  {
    test: /\.tsx?$/,
    exclude: /(node_modules|\.webpack)/,
    use: {
      loader: 'ts-loader',
      options: {
        transpileOnly: true
      }
    }
  }
];
