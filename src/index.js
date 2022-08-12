import { app } from './app.js'

const server = app.listen(process.env.port || 3097)

server.on('listening', () => {
  const { address, port } = server.address()
  const host = address === '::' ? 'localhost' : address
  console.log(`Server listening at http://${host}:${port}`)
})

const errorEvents = ['unhandledRejection', 'uncaughtException']
errorEvents.forEach(event => {
  process.on(event, error => {
    console.error(`Uncaught ${event}`, error)
    process.exit(0)
  })
})
