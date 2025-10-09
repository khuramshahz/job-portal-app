import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Grid, Box, Typography, Pagination } from '@mui/material'
import JobCard from '../components/JobCard'
import Filters from '../components/Filters'

export default function JobList(){
  const [jobs,setJobs]=useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage] = useState(1)
  const [search,setSearch]=useState('')
  const [type,setType]=useState('')
  const [location,setLocation]=useState('')

  const fetchJobs=async(params={})=>{
    const res=await axios.get('http://localhost:5000/api/jobs',{ params: { ...params, page, limit: 10 } })
    setJobs(res.data.jobs)
    setTotalPages(res.data.totalPages)
  }

  useEffect(()=>{ fetchJobs() },[page])

  const applyFilters = () => { setPage(1); fetchJobs({ search, type, location }) }

  const handlePageChange = (event, value) => {
    setPage(value)
  }

  return (
    <Box sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 800, 
            background: 'linear-gradient(135deg, #ff6b35 0%, #f72585 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1
          }}
        >
          Find Your Dream Job
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
          Discover opportunities that match your skills and passions
        </Typography>
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Box sx={{ mb: 4 }}>
            <Filters search={search} setSearch={setSearch} type={type} setType={setType} location={location} setLocation={setLocation} applyFilters={applyFilters} />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: 'primary.main' }}>
              Available Jobs ({jobs.length})
            </Typography>
            {jobs.length === 0 ? (
              <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                No jobs found. Try adjusting your filters.
              </Typography>
            ) : (
              <>
                {jobs.map(job => <JobCard key={job._id} job={job} />)}
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" />
                </Box>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
