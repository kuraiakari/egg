/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react'
import type { PropsWithChildren } from 'react'
import { Dimensions, SafeAreaView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native'

import { Colors } from 'react-native/Libraries/NewAppScreen'

import Router from './src/router/Router'

type SectionProps = PropsWithChildren<{
  title: string
}>
const { width, height } = Dimensions.get('window')

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: Colors.lighter
  }
  return (
    <SafeAreaView style={[backgroundStyle, { height: height }]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Router />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600'
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400'
  },
  highlight: {
    fontWeight: '700'
  }
})

export default App
