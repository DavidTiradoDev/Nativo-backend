import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const registerBuyerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  full_name: z.string().min(2),
  phone: z.string().length(10),
  city: z.string().optional(),
  department: z.string().optional(),
  address: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
})

export const registerFarmerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  full_name: z.string().min(2),
  phone: z.string().length(10),
  farm_name: z.string().min(2),
  farm_description: z.string().optional(),
  latitude: z.number(),
  longitude: z.number(),
  address: z.string(),
  city: z.string(),
  department: z.string(),
})
