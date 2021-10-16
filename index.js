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

const errorHandler = (error, request, response, next) => {
    console.log('errorHandler: ', error.message);

    if (error.name === 'ValidationError') {
        return response.status(400).json(error)
    }
    next(error)
}

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



app.put('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    const updatedPerson = request.body

    console.log('Updating person with id: ', id, updatedPerson);

    Person.findByIdAndUpdate(id, updatedPerson).then(result => {
        response.json(result)
        console.log('Upateded person successfully');
    }).catch(error => { next(error) })
})


app.delete('/api/persons/:id', (request, response, next) => {
    console.log('Deleting person with id', request.params.id);
    Person.findByIdAndRemove(request.params.id).then(result => {
        if (result) {
            persons = result
            response.json((persons))
            response.status(204).end()
        }
        else {
            response.status(404).end()
        }
    }).catch(error => next(error))
})

//uuden henkilön lisääminen
app.post('/api/persons', (request, response, next) => {
    const body = request.body

    const newPerson = new Person({
        name: body.name,
        number: body.number,
    })

    newPerson.save().then(savedPerson => {
        console.log(`Added ${savedPerson.name} number ${savedPerson.number} to phonebook`)
        response.json(newPerson)
    }).catch(error => {
        next(error)
    })

})

app.get('/api/persons', (request, response, next) => {
    Person.find({}).then(result => {
        persons = result
        response.json((persons))
    }).catch(error => { next(error) })
})

app.get('/api/persons/:id', (request, response, next) => {
    console.log(request.params.id);
    Person.findById(request.params.id).then(result => {
        response.json((result))
    }).catch(error => { next(error) })
})

app.get('/info', (request, response, next) => {
    /*  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
     var prnDt = '' + new Date().toLocaleTimeString('en-us', options); */
    var today = new Date();
    var str = today.toUTCString();
    response.send(`<h1>Phonebook has info for ${persons.length} people</h1><h1>${str} ${today.getTimezoneOffset()}</h1>`)
        .catch(error => next(error))
})

app.use(errorHandler)

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})