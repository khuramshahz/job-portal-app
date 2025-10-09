import React, { useState, useContext } from 'react'
import axios from 'axios'
import { Box, TextField, Button, Paper, Typography } from '@mui/material'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useContext(AuthContext)
  const nav = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try{
      const res = await axios.post('http://localhost:5000/api/users/login', { email, password })
      login(res.data)
      nav('/')
    }catch(err){
      alert(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <Paper sx={{ maxWidth:420, m:'24px auto', p:2 }}>
      <Typography variant="h6" sx={{ mb:2 }}>Login</Typography>
      <Box component="form" onSubmit={submit} sx={{ display:'flex', flexDirection:'column', gap:2 }}>
        <TextField label="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <TextField label="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <Button type="submit" variant="contained">Login</Button>
      </Box>
    </Paper>
  )
}
