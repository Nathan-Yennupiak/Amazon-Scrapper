const express = require("express")
const request = require("request-promise")

const app = express()
const PORT = process.env.PORT || 5000

const apiKey = '98f2bb99721a49ab0eda2b102cb7db8e';
const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json())

app.get('/', (req, res) => {
    res.send("Welcome to Amazon Scrapper API")
})

//GET PRODUCT  DETAILS
app.get('/products/:productId', async(req, res) => {
    const { productId } = req.params;
    // const { api_key } = req.query;

    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.com/dp/${productId}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

app.listen(PORT, () => console.log(`server running on port ${PORT}`))