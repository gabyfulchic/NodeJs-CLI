#!/usr/bin/env node

const program = require('commander')
const game = require('./game')

program
    .version('1.0.0', '-v, --version')
    .option('-n, --number <number>', 'Number of questions', parseInt)
    .option('-m, --multiple', 'Launch game with four possible answers')
    .option('-d, --difficulty <difficulty>', 'Questions\' difficulty', /^(easy|medium|hard)$/i)

program.parse(process.argv)

let nbQuestions = 10
let type = 'boolean'

if (program.number) 
    nbQuestions = program.number
if (program.multiple) 
    type = 'multiple'

let apiCall = 'api.php?amount=' + nbQuestions + '&type=' + type

if (program.difficulty) 
    apiCall += '&difficulty=' + program.difficulty
    
game.launch(nbQuestions, type, apiCall)

