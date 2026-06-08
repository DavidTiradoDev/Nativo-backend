import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { prisma } from '../../shared/db/prisma.client'
import { env } from '../../shared/config/env'
import { AppError } from '../../shared/errors/AppError'
import type { LoginInput, RegisterBuyerInput, RegisterFarmerInput, AuthResponse, TokenPair } from './auth.types'

function generateTokens(userId: string, userType: string): TokenPair {
  const access_token = jwt.sign(
    { sub: userId, type: userType },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'] }
  )
  const refresh_token = jwt.sign(
    { sub: userId },
    env.JWT_REFRESH_SECRET,
    { expiresIn: env.JWT_REFRESH_EXPIRES_IN as jwt.SignOptions['expiresIn'] }
  )
  return { access_token, refresh_token, expires_in: 3600 }
}

export async function login(data: LoginInput): Promise<AuthResponse> {
  const user = await prisma.user.findUnique({ where: { email: data.email } })

  if (!user) throw new AppError('Credenciales inválidas', 401)

  const passwordMatch = await bcrypt.compare(data.password, user.passwordHash)
  if (!passwordMatch) throw new AppError('Credenciales inválidas', 401)

  if (!user.isActive) throw new AppError('Usuario inactivo', 403)

  if (user.userType === 'FARMER') {
    const farmer = await prisma.farmer.findUnique({ where: { id: user.id } })
    if (farmer?.approvalStatus === 'PENDING') {
      throw new AppError('Tu cuenta está pendiente de aprobación', 403)
    }
    if (farmer?.approvalStatus === 'REJECTED') {
      throw new AppError('Tu cuenta ha sido rechazada', 403)
    }
  }

  const tokens = generateTokens(user.id, user.userType)

  return {
    user: {
      id: user.id,
      email: user.email,
      full_name: user.fullName,
      user_type: user.userType,
      is_verified: user.isVerified,
    },
    tokens,
  }
}

export async function registerBuyer(data: RegisterBuyerInput): Promise<AuthResponse> {
  // TODO
  throw new AppError('Not implemented', 501)
}

export async function registerFarmer(data: RegisterFarmerInput): Promise<AuthResponse> {
  // TODO
  throw new AppError('Not implemented', 501)
}
