import 'dotenv/config'
import express from 'express'
import nunjucks from 'nunjucks'
import path from 'path'
import mongoose from 'mongoose'

import routes from './routes'

const app = express()
const PORT = process.env.PORT || 3333

app.set('view engine', 'njk')

app.use(express.static(path.resolve(__dirname, 'public')))

app.use('/files', express.static(path.resolve(__dirname, 'temp')))

nunjucks.configure(path.resolve(__dirname, 'app', 'views'), {
  express: app,
  noCache: true,
  autoescape: false
})

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

app.use(express.urlencoded({ extended: true }))

app.use(routes)

app.listen(PORT)
