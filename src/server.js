const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes.js');
const stressQuestionsRouter = require('./routes/stressQuestions.js');
const userResponsesRouter = require('./routes/userResponses');

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


const PORT = process.env.PORT || 5000;


app.use('/api/auth',authRoutes)
app.use('/api/stress-questions', stressQuestionsRouter);
app.use('/api/user-responses', userResponsesRouter);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;