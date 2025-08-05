const dotenv = require('dotenv')
dotenv.config() 

const express = require('express')
const app = express()
const userRouter = require('./Router/userRouter')
const cookieParser = require('cookie-parser')



// DataBase
const connectToDB = require('./config/db')
connectToDB() 

app.set("view engine","ejs")

app.use(cookieParser)

app.use(express.json())
app.use(express.urlencoded())

// app.get('/', (req, res) => res.send('Hello World!'))
app.use('/user',userRouter)

const port = 3000
app.listen(port, () => console.log(`listening on port ${port}!`))