import { ServiceId } from './service'

export default interface Help {
  sid: ServiceId
  title: string
  subtitle?: string
  text: string
}
