const express = require('express')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const PORT = process.env.PORT || 5000

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
