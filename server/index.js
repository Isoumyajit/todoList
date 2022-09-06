import db from './database/db.js'
import express from 'express'
import Router from './router/Router.js'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()
app.use(express.json())
db()

app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use('/', Router)

app.listen(3001, () => {
  console.log('The espress is running on port 3001')
})
