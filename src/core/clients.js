import axios from 'axios'

export const carchost = axios.create({
  baseURL: 'https://carchost.fieldcontrol.com.br',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Api-Key': process.env.CARCHOST_API_KEY,
    'User-Agent': 'bot-do-leo/0.0.1'
  }
})
