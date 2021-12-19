const express = require ('express')
const app = express()
const bcrypt = require('bcrypt')

app.use(express.json())

const students = []

app.get('/students', (req,res) => {
  res.json(students)
})
app.post('/students', async (req, res) =>{
  try{
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    const student = { name: req.body.name, password: hashedPassword}
    students.push(student)
    res.status(201).send()
  } catch {
    res.status(500).send()
  }
})

app.post('/students/login', async (req,res) => {
  const student = students.find(student => student.name = req.body.name)
  if ( student == null) {
    return res.status(400).send('Cannot this student')
  }
  try {
    if (await bcrypt.compare(req.body.password, student.password)) {
      res.send('Succsessfully loged in')
    }else {
      res.send('You are not allowed')
    }
  } catch {
    res.status(500).send()
  }
  })
app.listen(3001)
