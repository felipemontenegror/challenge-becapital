const express = require('express')
var cors = require('cors')
const connectDB = require('./config/db')
const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())

// MongoDB 
connectDB


app.get('/', (req, res) => res.send('Server Hello'))

app.use('/product', require('./routes/api/product'))

app.listen(PORT, () => { 
    console.log(`port ${PORT}`)})