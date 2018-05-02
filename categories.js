#!/usr/bin/env node

const request = require('axios')
const chalk = require('chalk')
const baseEndPoint = 'https://opentdb.com/api'

exports.lister = async function listCategories(){
	try{
		const categoriesRequest = await request.get(baseEndPoint+'_category.php')

		for(const [index, item] of categoriesRequest.data.trivia_categories.entries()){
			categoryId = index // variable pour nous indiquer à quoi correspond l'index ;)
			console.log(categoryId+" -", chalk.green(item.name))
		}

	}catch(e){
		console.error(e.message)
	}
}

exports.getAll = async function getCategories(){

	let ctgDictionnary = {}
	try{
		const categoriesRequest = await request.get(baseEndPoint+'_category.php')
		
		for(const [index, item] of categoriesRequest.data.trivia_categories.entries()){
            ctgDictionnary[index] = item.name
        }

        return ctgDictionnary;

	}catch(e){
		console.error(e.message)
	}
}
