#!/usr/bin/env node

const request = require('axios')
const baseEndPoint = 'https://opentdb.com/api'


async function testing() {
	try{
	const test = await request.get(baseEndPoint+'.php?category=26')

	// console.log("1er", test) all configs
	// console.log("2ème", test.data) bad request
	// console.log("3ème", test.results) bad request

	// quand on fait https://opentdb.com/api.php?category=26 sur le site web cela
	// affiche directement le .data du retour de la requête il faut donc sur le code 
	// rajouter .data avant d'écrire .results pour nous

	console.log("The good one :) ", test.data.results)

	// bizarrement la propriété de data pouvont connaître le nom de la catégorie
	// selectionnée semble être results quand on fait un test.data
	// {"response_code":2,"results":[]}

	// or lorsqu'on fait le console ci-dessus cela retourne le message dessous :
	// The good one :)  []
	
	// je ne comprends donc pas comment l'utilisateur en rensaignant un id de category
	// peux nous permettre de trouver la bonne catégorie et de lui lancer une partie
	// avec la categorie de son choix...

	// On peut toujours passer par une sorte de getAll categories et ensuite on cherche dans 
	// le tableau suivant ce que l'utilisateur nous renseigne ( une catégorie ou un index )

	}catch(e){
		console.error(e.message)
	}
}

testing()