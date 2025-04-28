// npm
import express from 'express'
import cors from 'cors'
import logger from 'morgan'
import dotenv from 'dotenv'

// config

// routes

// do the thing
dotenv.config()
const app = express()


app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))




