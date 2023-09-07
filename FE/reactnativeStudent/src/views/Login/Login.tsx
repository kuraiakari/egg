import React, { useState } from 'react'
import { SafeAreaView, Text, StyleSheet } from 'react-native'
import { InputItem, View, WhiteSpace, WingBlank } from '@ant-design/react-native'
import CustomButton from '../../components/Button/Button'
const Login = () => {
  const [mssv, setMssv] = useState('')
  const [password, setPassord] = useState('')
  //   const [disable, setDisable] = useState(true)
  //   if (disable && mssv && password) setDisable(false)
  //   if (!disable && (!mssv || !password)) {
  //     setDisable(true)
  //   }
  const data = {
    link_API: 'assa',
    dataSend: [
      {
        name: 'mssv',
        value: mssv,
        custome_require: true
      },
      {
        name: 'password',
        value: password,
        custome_require: true
      }
    ],
    navigate: '/home'
  }
  const [messError, setMessError] = useState('')
  return (
    <SafeAreaView style={{ justifyContent: 'center' }}>
      <WingBlank>
        <Text style={[styles.header, styles.fontRubik]}>Đăng nhập</Text>
        <WhiteSpace />
        <InputItem placeholder='Mã số sinh viên' onChangeText={(newMssv) => setMssv(newMssv)} />
        <WhiteSpace />
        <InputItem placeholder='Mật khẩu' onChange={(password) => setPassord(password)} />
        <WhiteSpace />
        {messError && <View style={{ color: 'red' }}>{messError}</View>}
        <WhiteSpace />
        <CustomButton
          content='Sign in'
          data={data}
          setMessError={setMessError}
          // disable={disable}
        />
      </WingBlank>
    </SafeAreaView>
  )
}

export default Login

//css
const styles = StyleSheet.create({
  fontRubik: {
    fontFamily: 'Rubik',
    fontWeight: '500',
    color: '#000'
  },
  header: {
    fontSize: 28
  }
})
