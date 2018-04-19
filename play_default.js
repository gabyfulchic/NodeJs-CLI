#!/usr/bin/env node

const utf8 = require('utf8');
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();
const inquirer = require('inquirer')
const request = require('axios')
const api = request.create({
    baseURL: 'https://opentdb.com/',
})

async function getQuiz(nbQuestions) {
    try {
        let score = 0
        const response = await api.get('api.php?amount=' + nbQuestions + '&type=boolean')
        const data = response.data
        for (let i = 0; i < nbQuestions; i++) {
            console.log('\nCategory : ', data.results[i].category)
            console.log('Difficulty : ', data.results[i].difficulty)
            console.log(entities.decode(data.results[i].question))
            const question = await inquirer.prompt([{
                type: 'confirm',
                message: 'true or false ?',
                name: 'response'
            }])
            let solution = data.results[i].correct_answer.toLowerCase()
            console.log('Your answer : ', question.response)
            console.log('Good answer : ', solution)
            if (solution == question.response.toString())
                score += 1
        }
        console.log("Score : ", score +'/' + nbQuestions)
    }
    catch (error) {
        console.log(error.message)
    }
}

getQuiz(10)