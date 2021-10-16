const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

/* const password = process.argv[2] */

const databaseUrl = process.env.MONGODB_URI

console.log('connecting to', databaseUrl)
mongoose.connect(databaseUrl).then(result => {
    console.log('connected to MongoDB')
})
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, minlength: 3 },
    number: { type: String, required: true, minlength: 8 },
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)
