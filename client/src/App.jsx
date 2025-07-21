import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Navigate } from 'react-router-dom';

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Home from '../components/Home'
import Login from '../components/Login'
import About from '../components/About'
import Signup from '../components/Signup'
import Logout from '../components/Logout'
import Todo_page from '../components/Todo_page'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContext } from '../auth'


function App() {
 const { user, loading } = useContext(AuthContext);
   if (loading) {
    return <p style={{color: 'white', textAlign: 'center'}}>Checking authentication...</p>;
  }
  return (
    <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',minHeight:'100vh'}}>
   <Router>
   <Navbar/>

    <Routes>
      <Route path="/" element={<Home />} />    
       <Route path="/about" element={<About/>} />   
      <Route path="/todo" element={user?<Todo_page/>:<Login/>} />
           <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
             <Route path="/signup" element={user?<Navigate to="/" />:<Signup/>} />
             <Route path="/logout" element={user?<Logout/>:<Navigate to='/'/>} />
      </Routes>
      <Footer />

    </Router>
    </div>
  )
}

export default App
