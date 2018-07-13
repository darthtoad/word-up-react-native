import { GIPHY_API_KEY } from './../Constants';

export async function getImages(word) {
    let url = 'http://api.giphy.com/v1/gifs/search?q=' + word + '&api_key=' + GIPHY_API_KEY;
    console.log(url);
    try {
        const fetchResult = await fetch(url);
        const response = await fetchResult;
        const jsonData = await response.json();
        const data = await jsonData.data;
        const random = Math.round(Math.random() * (data.length - 1));
        console.log(random);
        const imageUrl = await data[random].images.fixed_width.url;
        const width = await data[random].images.fixed_width.width;
        const height = await data[random].images.fixed_width.height;
        const returnObject = await {imageUrl, width, height};
        console.log(await imageUrl);
        console.log(await returnObject);
        return returnObject;
    } catch (e) {
        console.log(e);
        return null;
    }
}