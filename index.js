const express = require('express')
const app = express()
const port = 3000

app.get('/', (request, response) => {
    response.send('hello this is the main to do list page');
})

app.get('/add-an-item', (req, res) => {
    res.send('this is where a new item is added')
})

app.get('/completed-items', (req, res) => {
    res.send('this is where you see completed items')
})

app.listen(port, () => {
    console.log('Server running');
})