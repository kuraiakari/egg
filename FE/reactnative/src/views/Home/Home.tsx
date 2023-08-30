import React, { useEffect, useRef, useState } from 'react'
import {
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

const Home = () => {
  const { width, height } = Dimensions.get('window')
  const camera = useRef<Camera>(null)
  const devices = useCameraDevices()
  const device = devices.front

  const [showCamera, setShowCamera] = useState(false)
  const [imageSource, setImageSource] = useState('')

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
  console.log(location)
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
