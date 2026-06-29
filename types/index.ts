export interface Game {
  id: number
  name: string
  slug: string
  thumbnail_url: string
  description: string
  id_field_label: string       // "User ID", "Nomor Akun", etc.
  zone_field_label: string | null     // "Zone ID", "Server", etc.
  needs_zone: boolean
  is_active: boolean
}

export interface Product {
  id: number
  game_id: number
  digiflazz_sku: string
  name: string                 // "100 Diamonds", "Weekly Pass"
  selling_price: number        // in IDR integer
  is_active: boolean
  game?: Game
}

export interface Order {
  id: number
  order_code: string           // "AZKA-20260612-00543"
  product_id: number
  product_name: string
  game_name: string
  customer_no: string
  zone_id: string | null
  email: string
  phone: string | null
  selling_price: number
  payment_method: string | null
  payment_status: 'pending' | 'paid' | 'expired' | 'failed' | 'cancelled'
  topup_status: 'pending' | 'processing' | 'completed' | 'failed'
  digiflazz_sn: string | null  // Serial Number, only when completed
  midtrans_snap_token: string | null // Snap payment token
  refund_flagged_at: string | null // Refund timestamp
  refund_notes: string | null // Refund notes
  failure_reason: string | null
  paid_at: string | null
  completed_at: string | null
  expires_at: string           // ISO datetime for countdown
  created_at: string           // ISO datetime for creation
  logs: OrderLog[]
}

export interface OrderLog {
  id: number
  order_id: number
  event: string
  event_label: string          // Human-readable Indonesian label
  description: string
  type: 'success' | 'info' | 'error' | 'default'
  created_at: string
}

export interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'customer'
}
