import React from 'react'
import { Card, CardContent, Typography, Box, Button, Rating, Chip, Avatar } from '@mui/material'
import { Link } from 'react-router-dom'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import BusinessIcon from '@mui/icons-material/Business'
import WorkIcon from '@mui/icons-material/Work'

export default function JobCard({ job }){
  const rating = Number(job.rating) || Number((Math.random()*1.2 + 3.4).toFixed(1))
  return (
    <Card sx={{ mb: 3, position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)', border: '1px solid rgba(255,107,53,0.1)' }}>
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" gap={3} alignItems="flex-start">
          <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
            <BusinessIcon sx={{ color: 'white' }} />
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
              {job.title}
            </Typography>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <BusinessIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
              <Typography color="text.secondary" sx={{ fontSize: '0.9rem', fontWeight: 500 }}>
                {job.company}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <LocationOnIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
              <Typography color="text.secondary" sx={{ fontSize: '0.9rem' }}>
                {job.location}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.95rem', lineHeight: 1.5, mb: 2 }}>
              {job.description?.slice(0, 160)}...
            </Typography>
            <Box display="flex" gap={1} mb={2}>
              <Chip 
                icon={<WorkIcon />} 
                label={job.type} 
                size="small" 
                sx={{ bgcolor: 'secondary.main', color: 'white' }} 
              />
              <Chip 
                label={job.salary || 'Competitive'} 
                size="small" 
                sx={{ bgcolor: 'success.main', color: 'white' }} 
              />
            </Box>
          </Box>
          <Box sx={{ width: 200, textAlign: 'right' }}>
            <Box sx={{ mb: 1 }}>
              <Rating value={rating} precision={0.1} readOnly size="small" sx={{ color: '#ff9800' }} />
              <Typography variant="subtitle2" sx={{ fontSize: '0.85rem', fontWeight: 600 }}>
                {rating}
              </Typography>
            </Box>
            <Link to={`/jobs/${job._id}`}>
              <Button 
                variant="contained" 
                size="small" 
                sx={{ 
                  mt: 2, 
                  background: 'linear-gradient(135deg, #ff6b35 0%, #f72585 100%)',
                  '&:hover': { background: 'linear-gradient(135deg, #e55a2b 0%, #d61f73 100%)' }
                }}
              >
                View Details
              </Button>
            </Link>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
