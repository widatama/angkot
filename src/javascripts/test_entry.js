const context = require.context('./components', true, /\.test\.jsx$/);

context.keys().forEach(context);
