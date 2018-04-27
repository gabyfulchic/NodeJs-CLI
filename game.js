#!/usr/bin/env node

const Entities = require('html-entities').XmlEntities;
const entities = new Entities();
const inquirer = require('inquirer')
const request = require('axios')
const chalk = require('chalk');
const api = request.create({
    baseURL: 'https://opentdb.com/',
})

exports.launch = async function launchQuiz(nbQuestions, type = 'boolean', apiCall, ctgId) {
    try {
        let score = 0
        if (ctgId){
            return null
        }
        const response = await api.get(apiCall)
        const data = response.data.results
        for (let i = 0; i < nbQuestions; i++) {
            showQuestion(data[i])
            let question = (type == 'boolean') ? await boolean() : await multiple(data[i])
            if (isGoodAnswer(data[i].correct_answer, question.response)) {
                score += 1
                console.log(chalk.green('Bravo !'))
            }
            else {
                console.log(chalk.red('Dommage...'))
            }
        }
        console.log("\nScore : ", score +'/' + nbQuestions)
    }
    catch (error) {
        console.log(error.message)
    }

}

function showQuestion(data) {
    console.log('\nCategory : ', data.category)
    console.log('Difficulty : ', data.difficulty)
    console.log('Question :\n', entities.decode(data.question))
}

function boolean() {
    return inquirer.prompt([{
        type: 'confirm',
        message: "true or false ?",
        name: 'response'
    }])
}

function multiple(data) {
    let choices = data.incorrect_answers
    choices.push(data.correct_answer)
    return inquirer.prompt([{
        type: 'list',
        message: 'Choose the correct answer',
        choices: shuffleArray(choices),
        name: 'response'
    }])
}

function shuffleArray(array) {
    for (let i = 0; i < array.length; i++) {
        let rand = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[rand];
        array[rand] = temp;
    }
    return array;
}

function isGoodAnswer(solution, answer) {
    // console.log('Your answer : ', answer)
    console.log('Good answer : ', solution)
    return solution.toLowerCase() == answer.toString().toLowerCase()
}

// launchQuiz(10)