const request = require('axios')
const baseEndPoint = 'https://opentdb.com/api'

async function listCategories(){
	try{
		const categoriesRequest = await request.get(baseEndPoint+'_category.php')

		for(item of categoriesRequest.data.trivia_categories){
			console.log("- ", item.name)
		}

	}catch(e){
		console.error(e.message)
	}
}

listCategories()