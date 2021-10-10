const mongoose = require('mongoose')

const password = process.argv[2]
const databaseUrl = process.env.MONGODB_URI

console.log('connecting to', databaseUrl)
mongoose.connect(databaseUrl).then(result => {
    console.log('connected to MongoDB')
})
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)
