import axios from 'axios'

const localhost = axios.create({
  baseURL: 'http://localhost:3097'
})

const body = {
  id: 'OGZkZjg3NjctNmJhMy00OTEzLTliNjctNDVhODcyZDIyNTU2Ojg4MTc=',
  name: 'Casa do leo',
  message: 'teste',
  subject: 'Manutenção corretiva - Ar condicionado',
  status: 'pending',
  createdAt: '2022-04-30T11:17:12.053Z',
  identifier: '1#00004140',
  customer: { id: 'MTU0MzQ5MDo4ODE3' },
  service: { id: 'MTE4MTY6ODgxNw==' },
  equipments: [],
  contact: { email: null },
  cancelation: null
}

const headers = {
  authorization: 'Basic YWRtaW46YWRtaW4=',
  'content-type': 'application/json',
  'x-fieldcontrol-delivery': 'fab05317-65f2-4fdf-855f-679a991e2b2f',
  'x-fieldcontrol-event': 'ticket-created',
  'x-fieldcontrol-account': '8817',
  'accept-encoding': 'gzip, deflate',
  'user-agent': 'FieldControl-Hookshot/fab05317-65f2-4fdf-855f-679a991e2b2f',
  accept: '*/*',
  'content-length': '374',
  connection: 'close',
  'x-nginx-proxy': 'true',
  'x-forwarded-proto': 'https',
  host: 'leo-falco-97.loca.lt',
  'x-forwarded-for': '18.228.37.239',
  'x-real-ip': '18.228.37.239'
}

localhost.post('/', body, { headers })
  .then(({ status, data }) => {
    console.log('status', status)
    console.log('data', JSON.stringify(data, null, 2))
  })
