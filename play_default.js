#!/usr/bin/env node

const utf8 = require('utf8');
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();
const inquirer = require('inquirer')
const request = require('axios')
const api = request.create({
    baseURL: 'https://opentdb.com/',
})

async function getQuiz(nbQuestions, type = 'boolean') {
    try {
        let score = 0
        const response = await api.get('api.php?amount=' + nbQuestions + '&type=' + type)
        const data = response.data
        for (let i = 0; i < nbQuestions; i++) {
            showQuestion(data.results[i])
            let question = (type == 'boolean') ? await boolean() : await multiple(data.results[i])
            if (isGoodAnswer(data.results[i].correct_answer, question.response))
                score += 1
        }
        console.log("Score : ", score +'/' + nbQuestions)
    }
    catch (error) {
        console.log(error.message)
    }
}

function showQuestion(data) {
    console.log('\nCategory : ', data.category)
    console.log('Difficulty : ', data.difficulty)
    console.log(entities.decode(data.question))
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
    console.log('Your answer : ', answer)
    console.log('Good answer : ', solution)
    return solution.toLowerCase() == answer.toString().toLowerCase()
}

getQuiz(10)