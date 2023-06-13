const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require ('./config/db')
const PORT = process.env.PORT || 5000


//CONNECT TO DATABASE
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req,res) => {
    res.status(200).json({message: 'Welcome to the Support Desk API'})
})

//ROUTES
app.use('/api/users', require('./routes/userRouter'))

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`))
