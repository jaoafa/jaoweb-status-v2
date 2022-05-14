import { ServiceId } from './service'

export default interface Status {
  sid: ServiceId
  description: string
  detailUrl: string | null
  datetime: string
  status: string
  loading: boolean
}
