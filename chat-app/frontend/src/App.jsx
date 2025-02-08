import React from 'react'
import Navbar from './components/Navbar'
import { Routes, Route, Navigate} from "react-router-dom"
import { useEffect } from 'react';
import { Loader } from "lucide-react"

import HomePage from "./pages/HomePage"
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import ProfilePage from "./pages/ProfilePage"
import SettingsPage from "./pages/SettingsPage"
import { useAuthStore } from "./store/useAuthStore"
//import { checkAuth } from '../../backend/src/controllers/auth.controllers'


const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if(isCheckingAuth && !authUser) return (
    
    <div>
    <Loader className = "size-10 animate-spin" />
    </div>

  )

  return (
    <div>

      <Navbar />

      <Routes> 
        //proteced routes
        <Route path = "/" element = { authUser ? <HomePage /> : <Navigate to = "/login" /> } />
        <Route path = "/signup" element = {!authUser ? <SignupPage /> : <Navigate to ="/" /> } />
        <Route path = "/login" element = {!authUser ? <LoginPage /> : <Navigate to ="/" /> } />
        <Route path = "/settings" element = {!authUser ? <SettingsPage /> : <Navigate to ="/" /> } />
        <Route path = "/profile" element = { authUser ? <ProfilePage /> : <Navigate to ="/login" /> } />

      </Routes>


    </div>
  )
}

export default App
