import dotenv from 'dotenv'
dotenv.config()

import express, { Request, Response } from 'express'
import database from './database'

const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())

app.post('/groups/create', async (request: Request, response: Response) => {
  const { title } = request.body
  const newChatReference = await database.collection('chats').add({ title })
  const newChatData = await newChatReference.get().then(snapshot => snapshot.data())
  response.send(newChatData)
})

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`))
