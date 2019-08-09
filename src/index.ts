import dotenv from 'dotenv'
dotenv.config()

import express, { Request, Response } from 'express'
import database from './database'

const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())

app.get('/', (_request: Request, response: Response) => {
  response.send({ hello: 'world' })
})

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`))
