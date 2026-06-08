import Fastify from 'fastify'
import cors from '@fastify/cors'
import { env } from './shared/config/env'
import { AppError } from './shared/errors/AppError'
import { authRoutes } from './modules/auth/auth.routes'

const app = Fastify({ logger: true })

async function bootstrap() {
  await app.register(cors, { origin: true })

  app.setErrorHandler((error, _request, reply) => {
    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({ success: false, message: error.message })
    }
    app.log.error(error)
    reply.status(500).send({ success: false, message: 'Error interno del servidor' })
  })

  await app.register(authRoutes, { prefix: '/api/v1/auth' })

  app.get('/health', async () => ({ status: 'ok' }))

  await app.listen({ port: env.PORT, host: '0.0.0.0' })
}

bootstrap().catch((err) => {
  console.error(err)
  process.exit(1)
})
