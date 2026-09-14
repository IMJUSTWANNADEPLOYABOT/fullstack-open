const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
console.log('connecting to', url)

mongoose.connect(url, { family: 4 })
    .then(result => {
        console.log("Connected to MongoDB")
    })
    .catch(error => {
        console.log('Something went wrong', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3 
    },
    number: {
        type: String,
        validate: {
            validator: function(n) {
                return /\d{2,3}-\d{6,}/.test(n)
            },
            message: err => `${err.value} is not a valid phone number!`
        }
    },
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v 
    }
})

module.exports = mongoose.model('Person', personSchema)
