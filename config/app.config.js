// All paths are from app root

const config = {
  distPath: 'public',
  srcPath: 'src',
  templatePath: 'src/templates',
  configPath: 'config',
  title: 'Angkot',
  bundleNames: {
    js: '[name].[hash].js',
    jsChunk: 'chunk-[name].[hash].js',
    css: '[name].[hash].css',
    images: '[name].[ext]',
  },
  paths: {
    config: 'config',
    src: {
      path: 'src',
      templatePath: 'templates',
      javascriptsPath: 'javascripts',
      stylesheetsPath: 'stylesheets',
    },
    asset: {
      path: 'assets',
      imagesPath: 'images',
    },
    dist: {
      path: 'public',
      javascriptsPath: 'assets/javascripts',
      stylesheetsPath: 'assets/stylesheets',
      imagesPath: 'assets/images',
    },
  },
};

module.exports = config;
