var context = require.context("./unit", true, /\w*\.js\w*/);

context.keys().forEach(context);
