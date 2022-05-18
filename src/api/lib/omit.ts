export default function (obj: { [x: string]: any }, key: string) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [key]: _, ...data } = obj
  return data
}
