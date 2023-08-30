import { NativeRouter, Routes, Route } from 'react-router-native'
import Login from '../views/Login/Login'
import Home from '../views/Home/Home'

const Router = () => {
  return (
    <NativeRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        {/* for test */}
        <Route path='/home' element={<Home />} />
      </Routes>
    </NativeRouter>
  )
}
export default Router
