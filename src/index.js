const express = require('express')
const app = express()
const port = 3000
const recepieRouter = require('./routes/recepie');
const userRouter = require('./routes/user');

app.use(express.json()); // To handle POST requests
app.use(express.urlencoded({ extended: true })); 

app.use('/recepie', recepieRouter);
app.use('/user', userRouter);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port} 🍽️🧋`)
})