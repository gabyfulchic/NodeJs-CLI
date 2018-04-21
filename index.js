#!/usr/bin/env node

const request = require('axios');

async function main(){
    try{
         const amount = await request.get("https://opentdb.com/api.php?amount=10")
         console.log(amount)
    }catch (e){
       	 console.error("FAIL")
    }
}

main();