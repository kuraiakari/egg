import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { Button } from '@ant-design/react-native'

import handleSendData from '../../utils/handleSendData'
interface data {
  content: string
  data?: any
  setMessError?: any
  //   disable?: boolean
  backgroundColor?: string
  fontSize?: number
}
const CustomButton = ({ content, ...props }: data) => {
  //   const disable = props.disable ? true : false
  const backgroundColor = props.backgroundColor ? props.backgroundColor : '#00B578'
  const fontSize = props.fontSize ? props.fontSize : 24
  //   const opacity = props.disable ? 0.4 : 1
  return (
    <Button
      style={[
        {
          backgroundColor
          // opacity
        }
      ]}
      onPress={() => handleSendData(props.data, props.setMessError)}
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
