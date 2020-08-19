const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 5 }
]

//show all the contacts
app.get('/api/persons', (request,response) => {
    console.log('request body', request.body)
    console.log('persons',persons)
    response.json(persons)
})

//show no of contacts and datetime
app.get('/api/info', (request,response) => {
    const str = `Phonebook has info for ${persons.length} people`
    var datetime = new Date().toString()
    response.send(`<p>${str}</p><p>${datetime}</p>`)
})

//show individual resource
app.get('/api/persons/:id', (req,res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    console.log('person',)
    if (person){
        res.json(person)
    }else{
        res.status(404).end()
    }
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
        const newPerson = {
            name : body.name,
            number : body.number,
            id:id
        }
        persons = persons.concat(newPerson)
        res.json(newPerson)
    }
})

const PORT = 3001
app.listen(PORT,()=>{console.log('Server running on port',PORT)})