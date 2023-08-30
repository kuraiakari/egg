interface fieldInput {
  name: string
  value: string
  custome_require: boolean
}
interface data {
  link_API: string
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
  // const dataTest = {
  //   mssv: data.dataSend[0].value,
  //   password: data.dataSend[1].value
  // }
  // fetch('http://192.168.1.2:8000/login', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //     // 'Content-Type': 'application/x-www-form-urlencoded',
  //   },
  //   body: JSON.stringify(dataTest)
  // })
  // .then((reponse) => reponse.json())
  // .then((data) => console.log(data))
  if (data.navigate) setURLnavigate(data.navigate)
}

export default handleSendData
