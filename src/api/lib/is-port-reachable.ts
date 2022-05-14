import net from 'net'

export default async function isPortReachable(
  host: string,
  port: number
): Promise<boolean> {
  try {
    await new Promise<void>((resolve, reject) => {
      const socket = net.createConnection(port, host)
      socket.on('connect', () => {
        socket.end()
        resolve()
      })
      socket.on('timeout', () => {
        socket.end()
        reject(new Error('timeout'))
      })
      socket.on('error', (err: any) => {
        socket.destroy()
        reject(err)
      })
    })
    return true
  } catch (err) {
    return false
  }
}
