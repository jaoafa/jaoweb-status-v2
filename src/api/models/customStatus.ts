import { ServiceId } from './service'

export default interface CustomStatus {
  cid: number
  sid: ServiceId
  title: string
  text: string
  detailUrl?: string
  status: string
  register_ip: string
  started_at: string
  ended_at: string
  created_at: string
  updated_at: string
}

export type PostCustomStatus = Omit<
  CustomStatus,
  'cid' | 'register_ip' | 'created_at' | 'updated_at'
>

export type ResponseCustomStatus = Omit<CustomStatus, 'register_ip'>
