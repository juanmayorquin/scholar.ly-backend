const express = require("express");
const { nanoid } = require("nanoid");

const app = express();
const port = process.env.PORT;

const subjects = [
  {
    id: nanoid(),
    name: "Cálculo",
    grades: [
      {
        id: nanoid(),
        value: 4,
        percent: 20,
      },
      {
        id: nanoid(),
        value: 3.5,
        percent: 15,
      },
      {
        id: nanoid(),
        value: 4,
        percent: 10,
      },
    ],
  },
  {
    id: nanoid(),
    name: "Estadística",
    grades: [
      {
        id: nanoid(),
        value: 2,
        percent: 20,
      },
      {
        id: nanoid(),
        value: 4.5,
        percent: 15,
      },
      {
        id: nanoid(),
        value: 3.8,
        percent: 10,
      },
    ],
  },
];

app.get("/", (req, res) => {
  console.log(subjects);
  res.send("<h1>Hola vv</h1>");
});

// Búsqueda de materia por id
app.get("/api/:subjectId", (req, res) => {
  const subjectId = req.params.subjectId;
  const subject = subjects.find((subject) => subject.id === subjectId);
  res.json(subject);
});

// Búsqueda de calificación por id
app.get("/api/:subjectId/:gradeId", (req, res) => {
  const subjectId = req.params.subjectId;
  const gradeId = req.params.gradeId;
  const subject = subjects.find((subject) => subject.id === subjectId);
  const grade = subject.grades.find((grade) => grade.id === gradeId);
  res.json(grade);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
