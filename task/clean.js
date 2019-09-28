const path = require('path');
const config = require('../config/app.config');
const executor = require('./executor');

const rootPath = path.join(__dirname, '..');

executor(`rm -rf ${path.join(rootPath, config.distPath)}`);
