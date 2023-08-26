interface fieldInput {
  name: string
  value: string
  custome_require: boolean
}
interface data {
  link_URL: string
  dataSend: Array<fieldInput>
}
const handleSendData = (data: data, setMessError: any) => {
  for (let value of data.dataSend) {
    console.log(value)
    if (value.custome_require && !value.value) {
      setMessError(`${value.name} khong duoc de trong`)
      return
    }
    setMessError('')
  }
  // call Api
}

export default handleSendData
