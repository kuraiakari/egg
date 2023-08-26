import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { Button, WhiteSpace } from '@ant-design/react-native'
interface data {
  content: string
  data?: any
  setMessError: any
  //   disable?: boolean
  backgroundColor?: string
  fontSize?: number
}
const CustomButton = ({ content, ...props }: data) => {
  //   const disable = props.disable ? true : false
  const backgroundColor = props.backgroundColor ? props.backgroundColor : '#00B578'
  const fontSize = props.fontSize ? props.fontSize : 24
  //   const opacity = props.disable ? 0.4 : 1
  const handleFetchData = () => {
    for (let value of props.data.dataSend) {
      console.log(value)
      if (value.custome_require && !value.value) {
        props.setMessError(`${value.name} khong duoc de trong`)
        return
      }
    }
    // props.setMessError('Co loi')
  }
  return (
    <Button
      style={[
        {
          backgroundColor
          // opacity
        }
      ]}
      onPress={handleFetchData}
      // disabled={disable
    >
      <Text style={[styles.fontRubik, { fontSize }]}>{content}</Text>
    </Button>
  )
}

export default CustomButton

//css
const styles = StyleSheet.create({
  fontRubik: {
    fontFamily: 'Rubik',
    fontWeight: '500',
    color: '#fff'
  }
})
