import 'dotenv/config'
import express from 'express'
import nunjucks from 'nunjucks'
import path from 'path'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import methodOverride from 'method-override'

import routes from './routes'
import newRoutes from './routes/index'

const app = express()

app.set('view engine', 'njk')

app.use(express.static(path.resolve(__dirname, '..', 'public')))

app.use('/files', express.static(path.resolve(__dirname, 'temp')))

app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

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

app.use(routes)
app.use(newRoutes)

app.listen(process.env.PORT || 3333)
