const express = require('express')
var cors = require('cors')
const connectDB = require('./config/db')
const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())  //chamada BodyParser atualizada na versão 4 do node
app.use(express.urlencoded({ extended: false }));


// MongoDB 
connectDB()


app.get('/', (req, res) => res.send('Server Hello'))

app.use('/product', require('./routes/api/product'))

app.listen(PORT, () => { 
    console.log(`port ${PORT}`)})