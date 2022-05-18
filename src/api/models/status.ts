import { ServiceId } from './service'

export default interface Status {
  sid: ServiceId
  title?: string
  description: string
  detailUrl: string | null
  datetime: string
  status: string
  loading: boolean
}
