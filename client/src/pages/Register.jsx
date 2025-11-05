import React, { useState, useContext } from 'react'
import axios from 'axios'
import { Box, TextField, Button, Paper, Typography, MenuItem } from '@mui/material'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { api } from '../config/api'

export default function Register(){
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [role,setRole]=useState('applicant')
  const { login } = useContext(AuthContext)
  const nav = useNavigate()

  const submit=async(e)=>{
    e.preventDefault()
    try{
      const res=await axios.post(`${api.endpoints.users}/register`,{name,email,password,role})
      login(res.data)
      nav('/')
    }catch(err){
      alert(err.response?.data?.message||'Register failed')
    }
  }

  return (
    <Paper sx={{ maxWidth:420, m:'24px auto', p:2 }}>
      <Typography variant="h6" sx={{ mb:2 }}>Register</Typography>
      <Box component="form" onSubmit={submit} sx={{ display:'flex', flexDirection:'column', gap:2 }}>
        <TextField label="Name" value={name} onChange={e=>setName(e.target.value)} />
        <TextField label="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <TextField label="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <TextField select label="Role" value={role} onChange={e=>setRole(e.target.value)}>
          <MenuItem value="applicant">Applicant</MenuItem>
          <MenuItem value="employer">Employer</MenuItem>
        </TextField>
        <Button type="submit" variant="contained">Register</Button>
      </Box>
    </Paper>
  )
}
