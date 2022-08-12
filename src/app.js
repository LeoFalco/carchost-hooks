import express from 'express'
// import 'express-async-errors'

import { handleError, handleGetRoot, handlePostRoot } from './handlers.js'
export const app = express()

app.use(express.json())
app.get('/', handleGetRoot)

app.post('/', handlePostRoot)

app.use(handleError)
