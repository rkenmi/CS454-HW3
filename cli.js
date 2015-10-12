var app = require('./app');
var yargs = require('yargs');

var flags = yargs.usage('$0: Usage node cli.js')
  .options('h', {
    alias: 'help',
    describe: 'Display help'
  })
  .options('w', {
    alias: 'write',
    describe: 'writes a file with specified name and text',
    type: 'array'
  })
  .options('r', {
    alias: 'remove',
    describe: 'remove a file by name'
  })
  .options('m', {
    alias: 'math',
    describe: 'Gets Math Fact from numbersapi'
  })
  .options('t', {
    alias: 'trivia',
    describe: 'Gets Trivia Fact from numbersapi'
  })
  .options('d', {
    alias: 'date',
    describe: 'Gets Date or Year Fact from numbersapi'
  })
  .options('s', {
    alias: 'save',
    describe: 'Save facts as .JSON'
  })
  .argv;

if (flags.help) {
  yargs.showHelp();
} else {
  app.run(flags);
}
