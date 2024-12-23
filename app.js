const express = require('express')
const { nanoid } = require('nanoid')
const cors = require('cors')

const app = express()
const port = process.env.PORT

const subjects = [
  {
    id: nanoid(),
    name: 'Cálculo',
    grades: [
      {
        id: nanoid(),
        value: 4,
        percent: 20
      },
      {
        id: nanoid(),
        value: 3.5,
        percent: 15
      },
      {
        id: nanoid(),
        value: 4,
        percent: 10
      }
    ]
  },
  {
    id: nanoid(),
    name: 'Estadística',
    grades: [
      {
        id: nanoid(),
        value: 2,
        percent: 20
      },
      {
        id: nanoid(),
        value: 4.5,
        percent: 15
      },
      {
        id: nanoid(),
        value: 3.8,
        percent: 10
      }
    ]
  }
]

app.use(cors())
app.use(express.json())

app.get('/', (_, res) => {
  console.log(subjects)
  res.send('<h1>Hola vv</h1>')
})

app.get('/api/subjects', (_, res) => {
  res.json(subjects.map(subject => ({ id: subject.id, name: subject.name })))
})

// Búsqueda de materia por id
app.get('/api/:subjectId', (req, res) => {
  const subjectId = req.params.subjectId
  const subject = subjects.find((subject) => subject.id === subjectId)
  res.json(subject)
})

// Búsqueda de calificación por id
app.get('/api/:subjectId/:gradeId', (req, res) => {
  const subjectId = req.params.subjectId
  const gradeId = req.params.gradeId
  const subject = subjects.find((subject) => subject.id === subjectId)
  const grade = subject.grades.find((grade) => grade.id === gradeId)
  res.json(grade)
})

// Agregar una nueva calificación
app.post('/api/:subjectId', (req, res) => {
  const subjectId = req.params.subjectId
  const subject = subjects.find(subject => subject.id === subjectId)

  if (!subject) {
    return res.status(404).json({ error: 'Subject not found' })
  }

  const { value, percent } = req.body
  if (value && percent) {
    const newGrade = {
      id: nanoid(),
      value,
      percent
    }
    subject.grades.push(newGrade)
    res.status(201).json(newGrade)
  } else {
    res.status(400).json({ error: 'Value and percent are required' })
  }
})

app.put('/api/:subjectId/:gradeId', (req, res) => {
  const subjectId = req.params.subjectId
  const gradeId = req.params.gradeId
  const grade = req.body

  const subjectIndex = subjects.findIndex(subject => subject.id === subjectId)
  const gradeIndex = subjects[subjectIndex].grades.findIndex(grade => grade.id === gradeId)

  if (grade.value !== undefined || grade.value !== null) {
    subjects[subjectIndex].grades[gradeIndex].value = grade.value
    res.json(grade).status(201)
  }

  if (grade.percent !== undefined || grade.percent !== null) {
    subjects[subjectIndex].grades[gradeIndex].percent = grade.percent
    res.json(grade).status(201)
  }
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
