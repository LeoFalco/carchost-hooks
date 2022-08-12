import { carchost } from '../src/core/clients.js'

const order = await carchost.get('/orders', {
  params: {
    q: 'identifier:"1#00004145"'
  }
})
  .then(res => res.data.items[0])

console.log('order', order)

const comment = await carchost.post('/orders/' + order.id + '/comments', {
  message: 'la vai',
  type: 'public',
  postedBy: {
    name: 'leoFalco',
    avatarUrl: 'https://avatars.githubusercontent.com/u/25820906?v=4',
    externalId: 'leoFalco'
  }
})
  .catch(err => console.log('err', err.response.data))
console.log('comment', comment)
