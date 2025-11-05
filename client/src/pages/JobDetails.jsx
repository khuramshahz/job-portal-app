import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Box, Typography, TextField, Button, Paper } from '@mui/material'
import { api } from '../config/api'

export default function JobDetails(){
  const { id } = useParams()
  const [job,setJob]=useState(null)
  const [cover,setCover]=useState('')
  const [file,setFile]=useState(null)

  useEffect(()=>{
    const fetchJob=async()=>{
      const res=await axios.get(`${api.endpoints.jobs}/${id}`)
      setJob(res.data)
    }
    fetchJob()
  },[id])

  const apply=async(e)=>{
    e.preventDefault()
    try{
      const token=localStorage.getItem('token')
      const form=new FormData()
      form.append('jobId', id)
      form.append('coverLetter', cover)
      if(file) form.append('resume', file)
      await axios.post(api.endpoints.applications, form, { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } })
      alert('Applied')
    }catch(err){
      alert(err.response?.data?.message||'Apply failed')
    }
  }

  if(!job) return <div>Loading...</div>
  return (
    <Box>
      <Paper sx={{ p:3, mb:2 }}>
        <Typography variant="h4">{job.title}</Typography>
        <Typography color="text.secondary">{job.company} • {job.location}</Typography>
        <Typography sx={{ mt:2 }}>{job.description}</Typography>
      </Paper>

      <Paper sx={{ p:2 }}>
        <Typography variant="h6">Apply</Typography>
        <Box component="form" onSubmit={apply} sx={{ display:'flex', flexDirection:'column', gap:1 }}>
          <TextField label="Cover letter" multiline rows={4} value={cover} onChange={e=>setCover(e.target.value)} />
          <input type="file" onChange={e=>setFile(e.target.files[0])} />
          <Button type="submit" variant="contained">Apply</Button>
        </Box>
      </Paper>
    </Box>
  )
}
