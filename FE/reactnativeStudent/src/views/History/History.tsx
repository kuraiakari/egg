import { Button } from '@ant-design/react-native'
import React, { useState } from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import CalendarPicker from 'react-native-calendar-picker'

const { width, height } = Dimensions.get('window')
const History = () => {
  const [selectedStartDate, setSeclectedStartData] = useState<any>(Date)
  const onDateChange = (date: any) => {
    setSeclectedStartData(date)
  }
  const startDate = selectedStartDate ? selectedStartDate.toString() : ''

  return (
    <View style={{ height: height, backgroundColor: '#fff' }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#fff',
          width: '100%',
          marginTop: 20,
          marginBottom: 20
        }}
      >
        <View style={{ width: width / 3 }}>
          <Text style={{ fontSize: 16 }}>Quay lại</Text>
        </View>
        <View style={{ width: width / 3, alignItems: 'center' }}>
          <Text style={{ fontSize: 24 }}>Lịch sử</Text>
        </View>
        <View style={{ width: width / 3 }}></View>
      </View>
      <View style={{ backgroundColor: '#fff', marginBottom: 20 }}>
        <CalendarPicker
          onDateChange={onDateChange}
          weekdays={['Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'CN']}
          months={[
            'Tháng 1',
            'Tháng 2',
            'Tháng 3',
            'Tháng 4',
            'Tháng 5',
            'Tháng 6',
            'Tháng 7',
            'Tháng 8',
            'Tháng 9',
            'Tháng 10',
            'Tháng 11',
            'Tháng 12'
          ]}
          showDayStragglers={true}
          previousTitle='<'
          nextTitle='>'
          previousTitleStyle={{
            fontSize: 24,
            borderWidth: 1,
            borderRadius: 10,
            width: 35,
            marginLeft: 40,
            textAlign: 'center',
            borderColor: '#ccc'
          }}
          nextTitleStyle={{
            fontSize: 24,
            borderWidth: 1,
            borderRadius: 10,
            width: 35,
            marginRight: 40,
            textAlign: 'center',
            borderColor: '#ccc'
          }}
          selectedDayColor='#00B578'
          todayBackgroundColor='#99E1C9'
        />
      </View>
      <View>
        <Text>SELECTED DATE:{startDate}</Text>
      </View>
    </View>
  )
}

export default History
