require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

var morgan = require('morgan')
const { response } = require('express')
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

//show all the contacts
app.get('/api/persons', (request,response) => {
    // console.log('request body', request.body)
    // console.log('persons',persons)
    Person.find({}).then(person =>{
        console.log('person',person)
        response.json(person)
    }).catch(error =>console.log('error :',error))
    // response.json(persons)
})

//show no of contacts and datetime
app.get('/api/info', (request,response) => {
    const str = `Phonebook has info for ${persons.length} people`
    var datetime = new Date().toString()
    response.send(`<p>${str}</p><p>${datetime}</p>`)
})

//show individual resource
app.get('/api/persons/:id', (req,res) => {
    // const id = Number(req.params.id)
    // const person = persons.find(p => p.id === id)
    // console.log('person',)
    // if (person){
    //     res.json(person)
    // }else{
    //     res.status(404).end()
    // }
    Person.findById((req.params.id)).then(note => {
        res.json(note)
    })
})

//delete a contact
app.delete('/api/persons/:id',(req,res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)
    res.status(204).end()
})

//add a contact
app.post('/api/persons', (req,res) => {
    const body = req.body
    const id = Math.floor(Math.random()*1000)
    const alreadyExists = persons.find(p => p.name === body.name)

    if (!body.name || !body.number){
        res.status(400).json({
            error : "content is missing"
        })
    }
    else if (alreadyExists){
        res.status(400).json({
            error: "name must be unique"
        })
    }
    else{
        persons = persons.concat({ name: body.name, number: body.number, id: id })

        const person = new Person({
            name : body.name,
            number : body.number,
            id:id
        })
        console.log('person',person)
        person
            .save()
            .then(result => {
                console.log('result', result)
                res.json(result)
            })
            .catch(error => console.log('error',error))
    }
})

const PORT = process.env.PORT 
app.listen(PORT,()=>{console.log('Server running on port',PORT)})