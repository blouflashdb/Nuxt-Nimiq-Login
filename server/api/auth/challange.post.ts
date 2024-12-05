import { v4 as uuidv4 } from 'uuid'

export default defineEventHandler(async (event) => {
  const challenge = uuidv4()
  await replaceUserSession(event, {
    challenge,
  })

  return challenge
})
