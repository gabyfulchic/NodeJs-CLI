var commander = require('commander');

commander
	.version('0.1.0')
	.option('-h, --help', 'Show help widow')
	.parse(process.argv);

console.log('Présentation de notre quizz et de ses fonctionnalités ! : ');
if (commander.help) console.log('	')