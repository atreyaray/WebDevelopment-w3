const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]
const url = 
    `mongodb+srv://fullstack:${password}@phonebook.jzrvi.mongodb.net/<dbname>?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})

const personSchema = new mongoose.Schema({
    name: String,
    number: String, 
    id: Number 
})
const Person = mongoose.model('Person',personSchema)
if(process.argv.length > 3){
    const name = process.argv[3]
    const number = process.argv[4]
    const person = new Person({
        name : name,
        number : number,
        id : Math.floor(Math.random()*1000)
    })
    person.save().then(result => {
        console.log('contact saved',)
        mongoose.connection.close()
    })
}else{
    Person.find({}).then(result => {
        result.forEach(note => {
            console.log(note.name, note.number)
        })
        mongoose.connection.close()
    })
}
