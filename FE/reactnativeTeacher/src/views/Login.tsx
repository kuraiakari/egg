import React, { useState } from 'react'
import { SafeAreaView, TouchableOpacity, StyleSheet, Dimensions, Text, View } from 'react-native'
import { TextareaItem, InputItem, WingBlank, WhiteSpace } from '@ant-design/react-native'

const { width, height } = Dimensions.get('window')

const LoginScreen = () => {
  const [msgv, setMSGV] = useState('')
  const [password, setPassword] = useState('')
  const [messError, setMessError] = useState<any>(false)
  const handleLogin = () => {
    if (!msgv) {
      setMessError('Không để trống msgv')
      return
    }
    if (!password) {
      setMessError('Không để trống password')
      return
    }
    const dataSend = {
      email: msgv,
      password
    }
    console.log(dataSend)
    fetch('http://54.169.192.125:8000/teacher_login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(dataSend)
    })
      .then((reponse) => reponse.json())
      .then((data) => console.log(data))
  }
  return (
    <SafeAreaView style={styles.fullScreen}>
      <TextareaItem editable={false}>Đăng nhập</TextareaItem>
      <WhiteSpace />
      <InputItem
        style={styles.inputArea}
        placeholder='Mã số giáo viên'
        onChange={(e: any) => {
          setMSGV(e)
          setMessError(false)
        }}
      />
      <WhiteSpace />
      <InputItem
        style={styles.inputArea}
        placeholder='Mật khẩu'
        onChange={(e: any) => {
          setPassword(e)
          setMessError(false)
        }}
      />
      <WhiteSpace />
      <WingBlank>
        <View style={{ width: '100%', alignItems: 'flex-end', height: 30 }}>
          {messError && <Text style={{ color: 'red', fontSize: 16 }}>{messError}</Text>}
        </View>
        <WhiteSpace />
        <TouchableOpacity onPress={handleLogin} style={styles.btnLogin}>
          <Text style={{ color: '#fff', alignSelf: 'center', lineHeight: 48, fontSize: 24 }}>Đăng nhập</Text>
        </TouchableOpacity>
      </WingBlank>
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  fullScreen: {
    backgroundColor: '#fff',
    height: height
  },
  inputArea: {
    borderWidth: 1,
    borderRadius: 5
  },
  btnLogin: {
    width: '100%',
    alignContent: 'center',
    backgroundColor: '#00B578',
    borderRadius: 100,
    color: '#fff'
  }
})
