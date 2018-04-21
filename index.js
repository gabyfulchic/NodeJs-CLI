#!/usr/bin/env node

const request = require('axios');
const program = require('commander')
const game = require('./game')

program
    .version('1.0.0')
    .option('-m, --multiple', 'Launch game with four possible answers')

program.parse(process.argv)

let nbQuestions = 10
let type = 'boolean'

if (program.multiple)
    type = 'multiple'

game.launch(nbQuestions, type)

