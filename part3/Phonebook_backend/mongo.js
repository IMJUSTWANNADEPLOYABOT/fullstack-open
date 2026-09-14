const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://feedlyfar_db_user:${password}@cluster0.oxdzqdg.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url, { family: 4 })

const noteSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', noteSchema)

const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
})

if (process.argv[3]) {
    person.save().then(result => {
        console.log(`Added ${person.name} number ${person.number} to phonebook`)
        mongoose.connection.close()
    })
}

if (!process.argv[3]) {
    Person.find({}).then(result => {
        console.log("Phonebook:")
        result.forEach(person => {
            console.log(`${person.name} - ${person.number}`)
        })
        mongoose.connection.close()
    })
}

