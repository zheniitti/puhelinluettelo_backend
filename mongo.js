const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}
else {
    const password = process.argv[2]
    const name = process.argv[3]
    const number = process.argv[4]

    const url =
        `mongodb+srv://fullstack21:${password}@cluster0.sfml8.mongodb.net/phonebook?retryWrites=true&w=majority`
    mongoose.connect(url)

    const personSchema = new mongoose.Schema({
        name: String,
        number: String,
    })

    const Person = mongoose.model('Person', personSchema)

    if (process.argv.length === 3) {
        console.log('phonebook:')
        Person.find({}).then(result => {
            result.forEach(person => {
                console.log(`${person.name} ${person.number}`)
            })
            mongoose.connection.close()
        })
    } else {

        const person = new Person({
            name: name,
            number: number,
        })

        person.save().then(response => {
            console.log(`added ${name} number ${number} to phonebook`)
            mongoose.connection.close()
        })
    }
}






