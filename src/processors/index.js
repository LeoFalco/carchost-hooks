import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const filePath = fileURLToPath(import.meta.url)
const dirname = path.dirname(filePath)

const files = fs.readdirSync(dirname)
  .filter(file => file.endsWith('.js'))
  .filter(file => file !== 'index.js')

export const handlers = {}

for (const file of files) {
  const handler = await import(path.join(dirname, file))
  const eventType = file.replace('.js', '')

  if (!handler.handle) {
    throw new Error(`Handler for event type ${eventType} does not have a handle function`)
  }

  handlers[eventType] = handler
}
