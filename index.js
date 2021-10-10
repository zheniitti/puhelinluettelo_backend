const express = require('express')
var morgan = require('morgan')
const app = express()
app.use(express.json())
/* app.use(morgan('tiny')) */
morgan.token('body', (req, res) => {
    if (req.method === 'POST') {
        return JSON.stringify(req.body)
    }
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
const cors = require('cors')
app.use(cors())
app.use(express.static('build'))

require('dotenv').config()
const Person = require('./models/person')
/* const PORT = process.env.PORT
 */

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    },
    {
        "name": "Mary Poppejndiecktpthp",
        "number": "39-23-6423122",
        "id": 5
    },
]
/* const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(n => n.id))
        : 0
    return maxId + 1
} */

app.get('/api/persons', (req, res) => {
    const id = (Number)
    Person.find({}).then(result => {
        persons = result
        res.json((persons))
        console.log('app.get /api/persons: ', persons)
    })
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(body.name);
    if (!body.name) {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    const name = body.name
    const number = body.number
    if (name == '' || number == '') return response.status(400).json({ error: 'name or number is empty' })
    if (persons.find(p => p.name == name)) return response.status(400).json({ error: 'name must be unique' })
    else {
        /* const person = {
            name: name,
            number: number,
            id: Math.floor(Math.random() * 10000000),
        }
        persons = persons.concat(person) */
        const newPerson = new Person({
            name: name,
            number: number,
        })
        newPerson.save().then(response => {
            console.log(`added ${name} number ${number} to phonebook`)
        })
        response.json(newPerson)
    }
})

app.get('/info', (req, res) => {

    /*  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
     var prnDt = '' + new Date().toLocaleTimeString('en-us', options); */

    var today = new Date();
    var str = today.toUTCString();  // deprecated! use toUTCString()
    res.send(`<h1>Phonebook has info for ${persons.length} people</h1><h1>${str} ${today.getTimezoneOffset()}</h1>`)
})



app.get('/api/persons/:id', (req, res) => {

    const id = Number(req.params.id)
    console.log(id);
    const person = persons.find(p => p.id === id)
    console.log(person)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {

    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)
    response.status(204).end()
})

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})