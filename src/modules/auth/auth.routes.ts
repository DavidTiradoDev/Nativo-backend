import { FastifyInstance } from 'fastify'
import { loginHandler, registerBuyerHandler, registerFarmerHandler } from './auth.controller'
import { loginSchema, registerBuyerSchema, registerFarmerSchema } from './auth.schema'

export async function authRoutes(app: FastifyInstance) {
  app.post('/login', loginHandler)
  app.post('/register/buyer', registerBuyerHandler)
  app.post('/register/farmer', registerFarmerHandler)
}
