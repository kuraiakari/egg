import React, { useEffect, useRef, useState } from 'react'
import {
  Button,
  Linking,
  ScrollView,
  Text,
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  PermissionsAndroid
} from 'react-native'
import { InputItem, WhiteSpace, WingBlank } from '@ant-design/react-native'

import { Camera, useCameraDevices } from 'react-native-vision-camera'
import Geolocation from 'react-native-geolocation-service'

import {
  initialize,
  startDiscoveringPeers,
  getAvailablePeers,
  connect,
  getConnectionInfo,
  sendMessage,
  createGroup,
  receiveMessage
} from 'react-native-wifi-p2p'

const Home = () => {
  const { width, height } = Dimensions.get('window')
  const camera = useRef<Camera>(null)
  const devices = useCameraDevices()
  const device = devices.front

  const [showCamera, setShowCamera] = useState(false)
  const [imageSource, setImageSource] = useState('')
  const [devicesConnect, setDeviesConnect] = useState<any>([])

  const [location, setLocation] = useState<any>(false)
  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setLocation(position)
      },
      (error) => {
        setLocation(false)
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    )
  }
  // console.log(location)
  useEffect(() => {
    const getPermission = async () => {
      const permission = await Camera.requestCameraPermission()
      if (permission === 'denied') await Linking.openSettings()
      //handle after refuse
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK'
      })
      if (granted === 'granted') {
        console.log('You can use Geolocation')
        getLocation()
      } else {
        console.log('You cannot use Location')
      }
      await initialize()
      const grant = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION, {
        title: 'Access to wi-fi P2P mode',
        message: 'ACCESS_COARSE_LOCATION',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK'
      })
      console.log(
        granted === PermissionsAndroid.RESULTS.GRANTED
          ? 'You can use the p2p mode'
          : 'Permission denied: p2p mode will not work'
      )
      const status = await startDiscoveringPeers()
      console.log('startDiscoveringPeers status: ', status)
    }
    getPermission()
  }, [])

  if (device == null) {
    return <Text> Camera not available </Text>
  }
  const capturePhoto = async () => {
    if (camera.current !== null) {
      const photo = await camera.current.takePhoto({})
      setImageSource(photo.path)
      setShowCamera(false)
    }
  }

  const onGetAvailableDevices = () => {
    getAvailablePeers().then((peers) => {
      console.log(peers)
      setDeviesConnect(peers)
    })
  }
  const connectToFirstDevice = () => {
    console.log('Connect to: ', devicesConnect.devices[0])
    connect(devicesConnect.devices[0].deviceAddress)
      .then(() => console.log('Successfully connected'))
      .catch((err) => console.error('Something gone wrong. Details: ', err))
  }
  const onGetConnectionInfo = () => {
    getConnectionInfo().then((info) => console.log('getConnectionInfo', info))
  }
  const onSendMessage = () => {
    sendMessage('Hello world!')
      .then((metaInfo) => console.log('Message sent successfully', metaInfo))
      .catch((err) => console.log('Error while message sending', err))
  }
  const onCreateGroup = () => {
    createGroup()
      .then(() => console.log('Group created successfully!'))
      .catch((err) => console.error('Something gone wrong. Details: ', err))
  }
  // const onReceiveMessage = () => {
  //   receiveMessage(props)
  //     .then((msg) => console.log('Message received successfully', msg))
  //     .catch((err) => console.log('Error while message receiving', err))
  // }
  return (
    <>
      <View></View>
      <Modal visible={showCamera}>
        {showCamera && (
          <View style={[styles.container, { width, height }]}>
            <Camera ref={camera} style={StyleSheet.absoluteFill} device={device} isActive={showCamera} photo={true} />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.camButton} onPress={() => capturePhoto()} />
            </View>
          </View>
        )}
      </Modal>
      <ScrollView>
        <InputItem placeholder='Học phần' />
        {/* Có thể làm input selector nếu có data */}
        <WhiteSpace />
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <ImageBackground source={{ uri: `file://${imageSource}` }} imageStyle={{ borderRadius: width / 3 }}>
            <TouchableOpacity
              style={{
                height: width / 1.5,
                width: width / 1.5,
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                borderRadius: width / 3,
                backgroundColor: imageSource ? undefined : '#333'
              }}
              onPress={() => setShowCamera(!showCamera)}
            >
              <Text style={{ color: '#fff' }}>Chụp ảnh</Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>

        <Button title='Get Available Devices' onPress={onGetAvailableDevices} />
        <Button title='Create group' onPress={onCreateGroup} />
        <Button title='Connect' onPress={connectToFirstDevice} />
        <Button title='Get connection Info' onPress={onGetConnectionInfo} />
        <Button title='Send message' onPress={onSendMessage} />
        {/* <Button title='Receive message' onPress={onReceiveMessage} /> */}
      </ScrollView>
      <View></View>
    </>
  )
}
export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  buttonContainer: {
    backgroundColor: '#000',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20
  },
  camButton: {
    width: 70,
    height: 70,
    borderWidth: 10,
    borderColor: 'rgba(255,255,255,0.9)',
    borderRadius: 50,
    backgroundColor: '#fff'
  }
})
