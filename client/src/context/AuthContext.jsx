import React, { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext()

export function AuthProvider({ children }){
  const [user, setUser] = useState(null)

  useEffect(()=>{
    const raw = localStorage.getItem('user')
    if(raw) setUser(JSON.parse(raw))
  },[])

  const login = (userObj) => {
    localStorage.setItem('user', JSON.stringify(userObj))
    if(userObj.token) localStorage.setItem('token', userObj.token)
    setUser(userObj)
  }

  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
