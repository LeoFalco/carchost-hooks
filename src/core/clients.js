import axios from 'axios'

export const carchost = axios.create({
  baseURL: 'https://carchost.fieldcontrol.com.br',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Api-Key': 'YWQwMGU0MDktOGRmYS00YTI2LWJkNTYtNjFkMGU5MmZjNDc2Ojg4MTc=',
    'User-Agent': 'bot-do-leo/0.0.1'
  }
})
