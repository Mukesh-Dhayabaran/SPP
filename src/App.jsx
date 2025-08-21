import { BrowserRouter,Routes,Route } from 'react-router-dom'
// import './App.css'
import Home from './pages/home/home'
import Register from './pages/register/register'
import Login from './pages/login/login'
import Dashboard from './pages/dashboard/dashboard'

function App() {

  return (
    
    <BrowserRouter>

        <Routes>
          <Route path="/" element={<Home/>} />     
          <Route path="/register" element={<Register/>} />     
          <Route path="/login" element={<Login/>} />      
          <Route path="/dashboard" element={<Dashboard/>} />      
        </Routes>

    </BrowserRouter>
  )
}

export default App
