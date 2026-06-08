export interface LoginInput {
  email: string
  password: string
}

export interface RegisterBuyerInput {
  email: string
  password: string
  full_name: string
  phone: string
  city?: string
  department?: string
  address?: string
  latitude?: number
  longitude?: number
}

export interface RegisterFarmerInput {
  email: string
  password: string
  full_name: string
  phone: string
  farm_name: string
  farm_description?: string
  latitude: number
  longitude: number
  address: string
  city: string
  department: string
}

export interface TokenPair {
  access_token: string
  refresh_token: string
  expires_in: number
}

export interface AuthUser {
  id: string
  email: string
  full_name: string
  user_type: string
  is_verified: boolean
}

export interface AuthResponse {
  user: AuthUser
  tokens: TokenPair
}
