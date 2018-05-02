#!/usr/bin/env node

const program = require('commander')
const game = require('./game')
var categories = require('./categories')
const chalk = require('chalk')
 
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
let listThemAll = {}

if (program.number) 
    nbQuestions = program.number
if (program.multiple) 
    type = 'multiple'

let apiCall = 'api.php?amount=' + nbQuestions// + '&type=' + type

if (program.difficulty) 
    apiCall += '&difficulty=' + program.difficulty
if (program.listCategories)
	categories.lister()
if (/^[0-9]*$/.test(program.category)==true) {

    ctgId = program.category + 9
    apiCall += '&category='+ctgId 
    console.log(apiCall)

    if (/^[0-9]*$/.test(ctgId)==false){
        
    }
}else if (/^[0-9]*$/.test(program.category)==false){
    console.log(chalk.red("You must choose a category ID, check them by using quiz --listCategories !"))
}
	
    
    
game.launch(nbQuestions, type, apiCall)

