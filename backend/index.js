const connectToMongo=require('./db');
connectToMongo();
const express = require('express')
var cors = require('cors');

const app = express()
const port = process.env.PORT ||5000// here we cant use 3000 because at that react app will be running

app.use(cors());

app.use(express.json())//this is the middle ware to use req body as used in auth.js

//Avilable routes( another folder for all router)
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`PrashNoteBook app listening at http://localhost:${port}`)
})

