import { API_KEY } from './../Constants.js';

export async function getDefinition(word) {
    const config = {
        method: 'GET',
        headers: {
            "X-Mashape-Key": API_KEY,
            "X-Mashape-Host": "wordsapiv1.p.mashape.com"        
        }
    }
    const fetchResult = await fetch('https://wordsapiv1.p.mashape.com/words/' + word, config);
    const response = await fetchResult;
    const jsonData = await response.json();
    console.log(jsonData);
    return jsonData;
}