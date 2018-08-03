let mashape;

getMashapeKey = async () => {
    try {
        mashape = await fetch("https://word-up-node-backend-nzkyhnunql.now.sh/mashape");
        mashape = await mashape.json();
        console.log(await mashape);
    } catch (error) {
      console.log(error);
    }
  }

export async function getDefinition(word) {
    try {
        await getMashapeKey();
        const config = {
            method: 'GET',
            headers: {
                "X-Mashape-Key": await mashape.mashapeKey,
                "X-Mashape-Host": "wordsapiv1.p.mashape.com"        
            }
        }
        const fetchResult = await fetch('https://wordsapiv1.p.mashape.com/words/' + word, config);
        const response = await fetchResult;
        const jsonData = await response.json();
        console.log(jsonData);
        return jsonData;
    } catch (e) {
        console.log(e);
        return null;
    }
}