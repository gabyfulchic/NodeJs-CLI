#!/usr/bin/env node

const program = require('commander')
const game = require('./game')
var categories = require('./categories')
 
program
    .version('1.0.0', '-v, --version')
    .option('-n, --number <number>', 'Number of questions', parseInt)
    .option('-m, --multiple', 'Launch game with four possible answers')
    .option('-d, --difficulty <difficulty>', 'Questions\' difficulty', /^(easy|medium|hard)$/i)
    .option('-l, --listCategories', 'Listing all the categories and their id')
    .option('-c, --category <number>', 'Choose your category by his id, to list them enter --listCategories', parseInt)

program.parse(process.argv)

let nbQuestions = 10
let type = 'boolean'
let ctgId = null

if (program.number) 
    nbQuestions = program.number
if (program.multiple) 
    type = 'multiple'

let apiCall = 'api.php?amount=' + nbQuestions + '&type=' + type

if (program.difficulty) 
    apiCall += '&difficulty=' + program.difficulty
if (program.listCategories)
	categories.lister()
if (program.category)
	ctgId = program.category

    
game.launch(nbQuestions, type, apiCall, ctgId)

