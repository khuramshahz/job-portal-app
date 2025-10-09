import React from 'react'
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material'
import WorkIcon from '@mui/icons-material/Work'
import SchoolIcon from '@mui/icons-material/School'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'

export default function CareerResources() {
  return (
    <Box sx={{ py: 8, px: 3, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h2" sx={{ textAlign: 'center', mb: 4, fontWeight: 800, background: 'linear-gradient(135deg, #ff6b35 0%, #f72585 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Career Resources
      </Typography>
      <Typography variant="h5" sx={{ textAlign: 'center', mb: 6, color: 'text.secondary', fontWeight: 400 }}>
        Tools and guides to advance your career journey
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)', height: '100%' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <WorkIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                Job Search Strategies
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
                Learn effective techniques for finding and applying to jobs that match your skills and interests.
              </Typography>
              <Button variant="contained" sx={{ background: 'linear-gradient(135deg, #ff6b35 0%, #f72585 100%)', '&:hover': { background: 'linear-gradient(135deg, #e55a2b 0%, #d61f73 100%)' } }}>
                Learn More
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)', height: '100%' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <SchoolIcon sx={{ fontSize: 64, color: 'secondary.main', mb: 2 }} />
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                Skill Development
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
                Discover resources for learning new skills and advancing your professional capabilities.
              </Typography>
              <Button variant="contained" sx={{ background: 'linear-gradient(135deg, #ff6b35 0%, #f72585 100%)', '&:hover': { background: 'linear-gradient(135deg, #e55a2b 0%, #d61f73 100%)' } }}>
                Explore Skills
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)', height: '100%' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <TrendingUpIcon sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                Career Planning
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
                Get guidance on setting career goals, networking, and long-term professional growth.
              </Typography>
              <Button variant="contained" sx={{ background: 'linear-gradient(135deg, #ff6b35 0%, #f72585 100%)', '&:hover': { background: 'linear-gradient(135deg, #e55a2b 0%, #d61f73 100%)' } }}>
                Plan Your Career
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}