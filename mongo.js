const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.o6t7jgj.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length == 5) {

  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  person.save().then(savedPerson => {
    console.log(`added ${savedPerson.name} number ${savedPerson.number} to the phonebook`)
    mongoose.connection.close()
  })
}

else {
  Person.find({}).then(result => {
    console.log(`Phonebook:`)
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}





