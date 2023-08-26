import React from 'react'
import { SafeAreaView, ScrollView, View } from 'react-native'
import { InputItem, WhiteSpace, WingBlank } from '@ant-design/react-native'

const Home = () => {
  return (
    <SafeAreaView>
      <WingBlank>
        <View></View>
        <ScrollView>
          <InputItem placeholder='Học phần' />
          {/* Có thể làm input selector nếu có data */}
          <WhiteSpace />
          <View></View>
        </ScrollView>
        <View></View>
      </WingBlank>
    </SafeAreaView>
  )
}
export default Home
