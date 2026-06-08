import { FastifyRequest, FastifyReply } from 'fastify'
import { login, registerBuyer, registerFarmer } from './auth.service'
import { loginSchema, registerBuyerSchema, registerFarmerSchema } from './auth.schema'
import { AppError } from '../../shared/errors/AppError'

export async function loginHandler(request: FastifyRequest, reply: FastifyReply) {
  const parsed = loginSchema.safeParse(request.body)
  if (!parsed.success) {
    throw new AppError(parsed.error.issues[0]?.message ?? 'Datos inválidos', 400)
  }
  const result = await login(parsed.data)
  reply.status(200).send({ success: true, data: result })
}

export async function registerBuyerHandler(request: FastifyRequest, reply: FastifyReply) {
  const parsed = registerBuyerSchema.safeParse(request.body)
  if (!parsed.success) {
    throw new AppError(parsed.error.issues[0]?.message ?? 'Datos inválidos', 400)
  }
  const result = await registerBuyer(parsed.data)
  reply.status(201).send({ success: true, data: result })
}

export async function registerFarmerHandler(request: FastifyRequest, reply: FastifyReply) {
  const parsed = registerFarmerSchema.safeParse(request.body)
  if (!parsed.success) {
    throw new AppError(parsed.error.issues[0]?.message ?? 'Datos inválidos', 400)
  }
  const result = await registerFarmer(parsed.data)
  reply.status(201).send({
    success: true,
    data: result,
    message: 'Registro exitoso. Tu cuenta será revisada en 24-48 horas.',
  })
}
