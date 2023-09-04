import { NativeRouter, Routes, Route } from 'react-router-native'
import Login from '../views/Login/Login'
import Home from '../views/Home/Home'
import History from '../views/History/History'

const Router = () => {
  return (
    <NativeRouter>
      <Routes>
        <Route path='/' element={<History />} />
        {/* for test */}
        <Route path='/home' element={<Home />} />
        <Route path='/history' element={<History />} />
      </Routes>
    </NativeRouter>
  )
}
export default Router
