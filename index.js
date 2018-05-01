#!/usr/bin/env node

const program = require('commander')
const game = require('./game')

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('quiz.db', (error) => {
    if (error) 
        console.log(err.message)
    console.log('Connection to the quiz database...')
})
 
db.serialize(function() {
//   db.run("CREATE TABLE user (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, token TEXT)")
//   db.run("CREATE TABLE scores (id INTEGER PRIMARY KEY AUTOINCREMENT, score INTEGER, date TEXT, user_id INTEGER REFERENCES user(id) ON DELETE CASCADE)")
 
//   var stmt = db.prepare("INSERT INTO user (name, token) VALUES (?, ?)");
//   stmt.run('toto', 'token');
//   stmt.finalize();
 
  db.each("SELECT id, name FROM user", function(err, row) {
      console.log(row.id + ": " + row.name);
  });
});
 
db.close();

program
    .version('1.0.0', '-v, --version')
    .option('-n, --number <number>', 'Number of questions', parseInt)
    .option('-m, --multiple', 'Launch game with four possible answers')
    .option('-d, --difficulty <difficulty>', 'Questions\' difficulty', /^(easy|medium|hard)$/i)
    .option('-u, --username <username>', 'What\'s your username ? ')

program.parse(process.argv)

let nbQuestions = 10
let type = 'boolean'
let user = false

if (program.number) 
    nbQuestions = program.number
if (program.multiple) 
    type = 'multiple'    
if (program.username)
    user = program.username

let apiCall = 'api.php?amount=' + nbQuestions + '&type=' + type

if (program.difficulty) 
    apiCall += '&difficulty=' + program.difficulty
    
game.launch(nbQuestions, type, apiCall, user)

