import dotenv from 'dotenv'
dotenv.config()

import express, { Request, Response } from 'express'
import database from './database'
import { Group, User, MemberList } from './types'

const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())

app.post('/groups/create', async (request: Request, response: Response) => {
  const { title }: Group = request.body
  const newGroupReference = await database.collection('groups').add({ title })
  await database.collection('members').doc(newGroupReference.id).set({})

  response.send({ id: newGroupReference.id })
})

app.post('/users/create', async (request: Request, response: Response) => {
  const { name }: User = request.body
  const newUserReference = await database.collection('users').add({ name })

  response.send({ id: newUserReference.id })
})

app.post('/groups/:group_id/add/:user_id', async (request: Request, response: Response) => {
  const { group_id, user_id } = request.params
  const membersReference =  await database.collection('members').doc(group_id)
  const membersSnapshot = await membersReference.get()
  const members: MemberList = await membersSnapshot.data()
  members[user_id] = true

  membersReference.set(members)
  response.send(members)
})

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`))
