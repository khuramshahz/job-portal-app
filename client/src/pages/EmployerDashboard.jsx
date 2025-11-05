import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { api } from '../config/api'

export default function EmployerDashboard(){
  const [jobs,setJobs]=useState([])
  const [title,setTitle]=useState('')
  const [company,setCompany]=useState('')
  const [location,setLocation]=useState('')
  const [type,setType]=useState('full-time')
  const [description,setDescription]=useState('')

  useEffect(()=>{
    const fetchJobs=async()=>{
      const token=localStorage.getItem('token')
      const res=await axios.get(`${api.endpoints.jobs}/myjobs`, { headers: { Authorization: `Bearer ${token}` } })
      setJobs(res.data)
    }
    fetchJobs()
  },[])

  const create=async(e)=>{
    e.preventDefault()
    try{
      const token=localStorage.getItem('token')
      const res=await axios.post(api.endpoints.jobs, { title, company, location, type, description }, { headers: { Authorization: `Bearer ${token}` } })
      setJobs(prev=>[res.data,...prev])
      alert('Job created')
    }catch(err){
      alert(err.response?.data?.message||'Create failed')
    }
  }

  return (
    <div>
      <h2>Employer Dashboard</h2>
      <form onSubmit={create}>
        <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
        <input placeholder="Company" value={company} onChange={e=>setCompany(e.target.value)} />
        <input placeholder="Location" value={location} onChange={e=>setLocation(e.target.value)} />
        <select value={type} onChange={e=>setType(e.target.value)}>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="contract">Contract</option>
        </select>
        <textarea placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
        <button type="submit">Create Job</button>
      </form>

      <h3>Your Jobs</h3>
      <ul>
        {jobs.map(job=> <li key={job._id}>{job.title} — {job.location}</li>)}
      </ul>
    </div>
  )
}
