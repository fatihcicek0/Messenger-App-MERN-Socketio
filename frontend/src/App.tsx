import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import { AuthProvider, useAuth } from './context/AuthContext'
import Register from './pages/register/Register'

function App() {
  const { isAuthenticated }: any = useAuth();
  console.log(isAuthenticated);
  return (
    <div className="App">
        <Routes>
          <Route path='/' element={isAuthenticated ? <Home /> : <Login />} > </Route>
          <Route path='/login' element={isAuthenticated ? <Home /> : <Login />}></Route>
          <Route path='/register' element={isAuthenticated ? <Home /> : <Register />}></Route>
        </Routes>
    </div>
  )
}

export default App
