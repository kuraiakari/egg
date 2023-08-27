interface fieldInput {
  name: string
  value: string
  custome_require: boolean
}
interface data {
  link_URL: string
  dataSend: Array<fieldInput>
  navigate: string
}
const handleSendData = (data: data, setMessError: any, setURLnavigate: any) => {
  for (let value of data.dataSend) {
    if (value.custome_require && !value.value) {
      setMessError(`${value.name} khong duoc de trong`)
      return
    }
    setMessError('')
  }
  // call Api
  if (data.navigate) setURLnavigate(data.navigate)
}

export default handleSendData
