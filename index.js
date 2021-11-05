const express = require("express")
const request = require("request-promise")

const app = express()
const PORT = process.env.PORT || 5000

// const api_Key = '98f2bb99721a49ab0eda2b102cb7db8e';
// const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

// Let others Generate their own Scrapper API
const generateScrapperUrl = `http://api.scraperapi.com?api_key=${api_Key}&autoparse=true`;
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Welcome to Amazon Scrapper API")
})

//GET PRODUCT  DETAILS
app.get('/products/:productId', async(req, res) => {
    const { productId } = req.params;
    const { api_Key } = req.query;


    try {
        const response = await request(`${generateScrapperUrl(api_Key)}&url=https://www.amazon.com/dp/${productId}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

//GET PRODUCT  REVIEWS
app.get('/products/:productId/reviews', async(req, res) => {
    const { productId } = req.params;
    const { api_Key } = req.query;



    try {
        const response = await request(`${generateScrapperUrl(api_Key)}&url=https://www.amazon.com/product-reviews/${productId}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

//GET PRODUCT OFFERS
app.get('/products/:productId/offers', async(req, res) => {
    const { productId } = req.params;
    const { api_Key } = req.query;



    try {
        const response = await request(`${generateScrapperUrl(api_Key)}&url=https://www.amazon.com/gp/offer-listing/${productId}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

//GET SEARCH RESULTS
app.get('/search/:searchQuery', async(req, res) => {
    const { searchQuery } = req.params;


    try {
        const response = await request(`${generateScrapperUrl(api_Key)}&url=https://www.amazon.com/s?k=/${searchQuery}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

app.listen(PORT, () => console.log(`server running on port ${PORT}`))