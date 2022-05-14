import fs from 'fs'

interface ConfigStructure {
  mackerel: {
    apiKey: string
  }
  checks: {
    jaomain: {
      db: {
        host: string
        port: number
        user: string
        password: string
      }
    }
    zakurohat: {
      mackerel: {
        hostId: string
        monitorId: string
      }
      db: {
        host: string
        port: number
        user: string
        password: string
      }
      service: {
        url: string
      }
    }
  }
}

export default function (): ConfigStructure {
  if (!fs.existsSync('config.json')) {
    throw new Error('config.json is not found.')
  }
  return JSON.parse(fs.readFileSync('config.json', 'utf-8'))
}
