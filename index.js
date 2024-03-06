const express = require('express')
const cors = require('cors');
const { default: axios } = require('axios');
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', async (req, res) => {
    try {
        const city = req.query.city || 'dhaka'; // Default to 'dhaka' if no city is provided
        const data = await fetchData(city);
        console.log(data);
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }

})


async function fetchData(city) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

// mongoose.set("strictQuery", false);
// mongoose.connect(process.env.MONGO_URI)
//     .then(() => {
app.listen(process.env.PORT, (req, res) => {
    console.log(`Server listening on ${process.env.PORT}`)
})
// })
// .catch((error) => {
//     console.log(error)
// })
