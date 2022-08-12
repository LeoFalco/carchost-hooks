import { carchost } from '../core/clients.js'
import { getData, getFistItem } from '../core/utils.js'

async function findRelatedCustomer (ticket) {
  if (ticket.customer && ticket.customer.id) {
    return carchost.get(`/customers/${ticket.customer.id}`).then(getData)
  }

  throw new Error(`Not found related customer for ticket ${ticket.number}`)
}

async function findRelatedService (ticket) {
  if (ticket.service && ticket.service.id) {
    return carchost.get(`/services/${ticket.service.id}`).then(getData)
  }

  throw new Error(`Not found related service for ticket ${ticket.number}`)
}

export async function handle (body) {
  const ticket = body

  const customer = await findRelatedCustomer(ticket)
  const service = await findRelatedService(ticket)

  const employee = await carchost.get('/employees', {
    params: { q: 'email:"leonardo@fieldcontrol.com.br"' }
  }).then(getFistItem)

  const order = await carchost.post('/orders', {
    identifier: ticket.identifier,
    customer: {
      id: customer.id
    },
    service: {
      id: service.id
    },
    address: customer.address,
    description: ticket.message,
    ticket: {
      id: ticket.id
    },
    tasks: [
      {
        duration: 60,
        coords: customer.address.coords,
        status: 'scheduled',
        scheduling: {
          date: new Date().toISOString().split('T')[0]
        },
        employee: {
          id: employee.id
        }
      }
    ]
  }).then(getData)

  console.log('created order', order)

  return {
    code: 'ok',
    processedAt: new Date().toISOString()
  }
}
