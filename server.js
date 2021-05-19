const express = require('express')
var cors = require('cors')
const app = express()
const connectDB = require('./config/db')
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())  //chamada BodyParser atualizada na versão 4 do node
app.use(express.urlencoded({ extended: true }));


// MongoDB 
connectDB()

//rotas de endpoint
app.use('/product', require('./routes/api/product'))
app.use('/user', require('./routes/api/user'))

app.get('/', (req, res) => res.send('Server Hello'))

app.listen(PORT, () => { 
    console.log(`port ${PORT}`)})