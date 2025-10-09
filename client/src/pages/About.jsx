import React from 'react'
import { Box, Typography, Grid, Card, CardContent, Avatar } from '@mui/material'
import WorkIcon from '@mui/icons-material/Work'
import GroupIcon from '@mui/icons-material/Group'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'

export default function About() {
  return (
    <Box sx={{ py: 8, px: 3, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h2" sx={{ textAlign: 'center', mb: 4, fontWeight: 800, background: 'linear-gradient(135deg, #ff6b35 0%, #f72585 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        About JobFinder
      </Typography>
      <Typography variant="h5" sx={{ textAlign: 'center', mb: 6, color: 'text.secondary', fontWeight: 400 }}>
        Connecting talent with opportunity, one job at a time.
      </Typography>

      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
            <CardContent>
              <Avatar sx={{ bgcolor: 'primary.main', width: 64, height: 64, mb: 2 }}>
                <WorkIcon sx={{ fontSize: 32, color: 'white' }} />
              </Avatar>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                Our Mission
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                At JobFinder, we believe everyone deserves a fulfilling career. Our platform bridges the gap between job seekers and employers, providing a seamless experience for discovering opportunities and building successful teams.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
            <CardContent>
              <Avatar sx={{ bgcolor: 'secondary.main', width: 64, height: 64, mb: 2 }}>
                <GroupIcon sx={{ fontSize: 32, color: 'white' }} />
              </Avatar>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                Our Team
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                Founded by passionate developers and HR professionals, our team is dedicated to innovation and user satisfaction. We continuously improve our platform to meet the evolving needs of the job market.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
            <CardContent>
              <Avatar sx={{ bgcolor: 'success.main', width: 64, height: 64, mb: 2 }}>
                <TrendingUpIcon sx={{ fontSize: 32, color: 'white' }} />
              </Avatar>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                Our Impact
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                Since our launch, we've helped thousands of professionals find their dream jobs and assisted companies in building exceptional teams. Join our community and be part of the success stories.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}