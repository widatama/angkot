const exec = require('child_process').exec;

function puts(error) {
  if (error !== null) {
    console.log(`exec error: ${error}`);
  }
}

const executor = function executor(command) {
  console.log(`> ${command}\n`);
  exec(command, puts);
};

module.exports = executor;
