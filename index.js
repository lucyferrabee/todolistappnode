const express = require('express');
var cors = require('cors');
const exphbs = require('express-handlebars');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const app = express();
app.use(express.json());
app.use(cors());

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('public'));

const port = 3000

const url = "mongodb://root:password@localhost:27017"

async function connectToDB() {
    const connection = await MongoClient.connect("mongodb://root:password@localhost:27017")
    const db = connection.db('todolistapp')
    return db.collection('tasks')
}

app.options('*', cors())
// get all tasks
app.get('/tasks', async (request, response) => {
    const connection = await MongoClient.connect(url)
    const db = connection.db('todolistapp')
    const collection = db.collection('tasks')
    const data = await collection.find({}).toArray();
    console.log(data);
    response.json(data);
})

// create a new task
app.post('/tasks', async (request, response) => {
    const connection = await MongoClient.connect(url)
    const db = connection.db('todolistapp')
    const collection = db.collection('tasks')
    console.log(request.body)
    const result = await collection.insertOne(request.body);
    response.json({"success": result.insertedId !== undefined})
})

// update a task to completed by id
app.put('/tasks/:id', async (request, response) => {
    const connection = await MongoClient.connect(url)
    const db = connection.db('todolistapp')
    const collection = db.collection('tasks')
    const result = await collection.updateOne({_id: ObjectId(request.params.id)},{$set:{completed: true}});
    console.log(result);
    response.json(result);
});

app.listen(port, () => {
    console.log('Server running');
})

// just respond with a json.
// communicate with it from postman. send it json and it will send you back json.
// connect it to mongo to store tasks, so it should ask mongo for all the tasks that it has. then return with them with json.
// it's up to you with how confident you are with the module system. get all three routes working on one file, then split up into modules.