let giphy;

getGiphyKey = async () => {
    try {
      giphy = await fetch("https://word-up-node-backend-nzkyhnunql.now.sh/giphy");
      giphy = await giphy.json();
      console.log(await giphy);
    } catch (error) {
      console.log(error);
    }
}

export async function getImages(word) {
    try {
        await getGiphyKey();
        let url = 'http://api.giphy.com/v1/gifs/search?q=' + word + '&api_key=' + await giphy.giphyKey;
        const response = await fetch(url);
        const jsonData = await response.json();
        const data = await jsonData.data;
        const random = Math.round(Math.random() * (data.length - 1));
        if (data[0].images) {
            const imageUrl = await data[random].images.fixed_width.url;
            const width = await data[random].images.fixed_width.width;
            const height = await data[random].images.fixed_width.height;
            const returnObject = await {imageUrl, width, height};
            return returnObject;
        } else {
            return null;
        }
    } catch (e) {
        console.log(e);
        return null;
    }
}