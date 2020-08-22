require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

var morgan = require('morgan')
const { response, request } = require('express')
morgan.token('postData',  (req, res) => { return JSON.stringify(req.body) })
app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'))

let persons = [
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 5 }
]
app.post('/api/persons', (req,res,next) =>{
    console.log('basic req')
    const {name,number} = req.body
    const id = Math.floor(Math.random()*1000)
    console.log(name,number, id)
    persons.concat({name,number,id})
    const person = new Person({name,number,id})
    console.log(person,)
    person.save().then(result =>{
        res.json(result)
    }).catch(error => {
        next(error)
    })
})

//add a contact
app.post('/api/persons', (req, res, next) => {
    const body = req.body
    const id = Math.floor(Math.random() * 1000)
    // const alreadyExists = persons.find(p => p.name === body.name)
    console.log('reaches back end')
    console.log(body.name,body.number)
    if (!body.name || !body.number) {
        res.status(400).json({
            error: "content is missing"
        })
    }
    else {
        persons = persons.concat({ name: body.name, number: body.number, id: id })
        const person = new Person({
            name: body.name,
            number: body.number,
            id: id
        })
        console.log('person', person)
        person.save()
            .then(result => {
                console.log('result', result)
                res.json(result)
            }).catch(error => next(error))
    }
})

//edit a contact
app.put('/api/persons/:id', (request,response,next) => {
    const body = request.body
    console.log(body,)
    const person = {
        name : body.name,
        number : body.number
    }
    console.log(person.name,person.number)
    Person.findByIdAndUpdate(request.params.id,person, {new:true})
        .then(result => {
            response.json(result)
        })
        .catch(error => next(error))
})


//show all the contacts
app.get('/api/persons', (request,response) => {
    Person.find({}).then(person =>{
        console.log('person',person)
        response.json(person)
    }).catch(error =>console.log('error :',error))
})

//show no of contacts and datetime
app.get('/api/info', (request,response) => {
    Person.find({}).then(person => {
        console.log('persons ',person.length)
        const str = `Phonebook has info for ${person.length} people`
        var datetime = new Date().toString()
        response.send(`<p>${str}</p><p>${datetime}</p>`)
    })
})

//show individual resource
app.get('/api/persons/:id', (req,res,next) => {
    console.log('hello, its me,')
    Person.findById(req.params.id).then(note => {
        if(note){
            res.json(note)
        }else{
            res.status(404).end()
        }
    })
    .catch(error => {
        console.log('its an error',)
        next(error)
    })
})

//delete a contact
app.delete('/api/persons/:id',(req,res,next) => {
    Person.findByIdAndRemove(req.params.id).then(result => {
        console.log(result,)
        res.status(204).end()
    }).catch(error => next(error))
})


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message})
    }
    next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT 
app.listen(PORT,()=>{console.log('Server running on port',PORT)})
