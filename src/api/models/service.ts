import { BaseCheck } from '../checks/base'

export type ServiceId = string

export default interface Service {
  sid: ServiceId
  icon: string
  name: string
  tags: string[]
  websiteUrl: string | null
  reportUrl: string | null
  check: BaseCheck
  flex: number
}
