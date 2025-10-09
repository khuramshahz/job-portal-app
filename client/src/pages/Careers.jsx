import React from 'react'
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material'
import WorkIcon from '@mui/icons-material/Work'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

export default function Careers() {
  const jobs = [
    {
      title: 'Senior Software Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      description: 'Join our engineering team to build scalable web applications and work on cutting-edge technologies.'
    },
    {
      title: 'Product Manager',
      department: 'Product',
      location: 'New York, NY',
      type: 'Full-time',
      description: 'Lead product development initiatives and work closely with engineering and design teams.'
    },
    {
      title: 'UX Designer',
      department: 'Design',
      location: 'San Francisco, CA',
      type: 'Full-time',
      description: 'Create intuitive user experiences and beautiful interfaces for our job portal platform.'
    },
    {
      title: 'Data Analyst',
      department: 'Analytics',
      location: 'Remote',
      type: 'Full-time',
      description: 'Analyze user data and provide insights to improve our platform and user experience.'
    }
  ]

  return (
    <Box sx={{ py: 8, px: 3, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h2" sx={{ textAlign: 'center', mb: 4, fontWeight: 800, background: 'linear-gradient(135deg, #ff6b35 0%, #f72585 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Careers at JobPortal
      </Typography>
      <Typography variant="h5" sx={{ textAlign: 'center', mb: 6, color: 'text.secondary', fontWeight: 400 }}>
        Join our team and help shape the future of job searching
      </Typography>

      <Grid container spacing={4}>
        {jobs.map((job, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card sx={{ height: '100%', borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)', transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-4px)' } }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
                  {job.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <WorkIcon sx={{ mr: 1, color: 'text.secondary', fontSize: 18 }} />
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {job.department}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationOnIcon sx={{ mr: 1, color: 'text.secondary', fontSize: 18 }} />
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {job.location}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <AccessTimeIcon sx={{ mr: 1, color: 'text.secondary', fontSize: 18 }} />
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {job.type}
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                  {job.description}
                </Typography>
                <Button variant="outlined" sx={{ borderColor: '#ff6b35', color: '#ff6b35', '&:hover': { borderColor: '#e55a2b', bgcolor: 'rgba(255, 107, 53, 0.04)' } }}>
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ textAlign: 'center', mt: 8 }}>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
          Don't see the perfect role?
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
          We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
        </Typography>
        <Button variant="contained" size="large" sx={{ background: 'linear-gradient(135deg, #ff6b35 0%, #f72585 100%)', '&:hover': { background: 'linear-gradient(135deg, #e55a2b 0%, #d61f73 100%)' } }}>
          Send Resume
        </Button>
      </Box>
    </Box>
  )
}