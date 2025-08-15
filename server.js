const express = require('express')
const logger = require('morgan')
const methodOverride = require('method-override')
const session = require('express-session')
const cors = require('cors')
require('dotenv').config()
const db = require('./db')

const PORT = process.env.PORT ? process.env.PORT : 3000

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(cors({
  origin: 'https://misos.surge.sh',
  credentials: true
}))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true,      
      sameSite: 'none'   
    }
  })
)

const authRouter = require('./routes/authRouter')
app.use('/auth', authRouter)

const sosRouter = require('./routes/sosRouter')
app.use('/api/sos', sosRouter)

const supportRouter = require('./routes/supportRouter')
app.use('/api/support', supportRouter)

const userRouter = require('./routes/userRouter')
app.use('/api/users', userRouter)

const informationMaterialsRouter = require('./routes/informationMaterialsRouter')
app.use('/api/information-materials', informationMaterialsRouter)



app.get('/', (req, res) => {
  res.send('Your app is connected . . . ')
})

app.listen(PORT, () => {
  console.log(`Running Server on Port ${PORT} . . . `)
})