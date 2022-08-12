import { AppError } from './app-error.js'
import { handlers } from './processors/index.js'

export function handleError (err, req, res, next) {
  console.log('err', err.isAxiosError ? err.toJSON() : err)

  console.log('err', {
    code: err.code,
    name: err.name,
    message: err.message
  })

  if (err instanceof AppError) {
    return res.status(err.status).send({
      code: err.code || 'error',
      message: err.message || 'Something went wrong',
      extra: err.extra || null
    })
  }

  return res.status(500).send({
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Internal server error',
    extra: {
      reason: err.message
    }
  })
};

export function handleGetRoot (req, res) {
  res.send({
    code: 'ok'
  })
}

export async function handlePostRoot (req, res) {
  console.log('body', req.body)
  console.log('headers', req.headers)

  const authorizationResult = validateAuthorization(req)
  if (!authorizationResult.valid) {
    console.log('authorizationResult', authorizationResult)
    throw new AppError({
      status: 401,
      code: 'UNAUTHORIZED',
      message: 'Unauthorized',
      extra: {
        reason: authorizationResult.reason
      }
    })
  }

  const result = await getHandler(req)
  if (!result.success) {
    console.log('getHandlerResult', result)
    return res.send({
      code: 'NO_HANDLER_REGISTERED',
      message: 'No handler for event type',
      extra: {
        reason: result.reason
      }
    })
  }

  const responseBody = await result.handler.handle(req.body)
  console.log('result', responseBody)

  res.status(200).send(responseBody)
}

function validateAuthorization (req) {
  const authorization = req && req.headers && req.headers.authorization

  const encoded = (authorization || '').replace(/^basic /i, '')
  const [username, password] = Buffer.from(encoded, 'base64').toString('utf-8').split(':')

  if (username !== 'admin' || password !== 'admin') {
    return {
      valid: false,
      reason: 'Invalid authorization header'
    }
  }

  return {
    valid: true
  }
}

async function getHandler (req) {
  const eventTypeHeaderNames = ['x-fieldcontrol-event', 'x-fieldcontrol-enterprise-event']

  for (const headerName of eventTypeHeaderNames) {
    const eventType = req.headers[headerName]
    if (eventType) {
      console.log('eventType', eventType)
      const handler = handlers[eventType]
      if (handler) {
        return {
          success: true,
          handler
        }
      } else {
        return {
          success: false,
          reason: `No handler registered for event type ${eventType}`
        }
      }
    }
  }

  return {
    success: false,
    reason: 'No event type header (x-fieldcontrol-enterprise-event or x-fieldcontrol-event) found'
  }
}
