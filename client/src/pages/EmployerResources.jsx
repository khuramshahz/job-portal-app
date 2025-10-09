import React from 'react'
import { Box, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material'
import BusinessIcon from '@mui/icons-material/Business'
import PeopleIcon from '@mui/icons-material/People'
import AnalyticsIcon from '@mui/icons-material/Analytics'
import SupportIcon from '@mui/icons-material/Support'

export default function EmployerResources() {
  const resources = [
    {
      title: 'Hiring Best Practices',
      description: 'Learn proven strategies for attracting top talent and building diverse teams.',
      icon: <PeopleIcon sx={{ fontSize: 48, color: '#ff6b35' }} />,
      link: '#'
    },
    {
      title: 'Employer Branding',
      description: 'Build a compelling employer brand that resonates with candidates.',
      icon: <BusinessIcon sx={{ fontSize: 48, color: '#ff6b35' }} />,
      link: '#'
    },
    {
      title: 'Recruitment Analytics',
      description: 'Track and analyze your hiring metrics to optimize your recruitment process.',
      icon: <AnalyticsIcon sx={{ fontSize: 48, color: '#ff6b35' }} />,
      link: '#'
    },
    {
      title: 'Employer Support',
      description: 'Get help with your account, billing, and technical issues.',
      icon: <SupportIcon sx={{ fontSize: 48, color: '#ff6b35' }} />,
      link: '#'
    }
  ]

  return (
    <Box sx={{ py: 8, px: 3, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h2" sx={{ textAlign: 'center', mb: 4, fontWeight: 800, background: 'linear-gradient(135deg, #ff6b35 0%, #f72585 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Employer Resources
      </Typography>
      <Typography variant="h5" sx={{ textAlign: 'center', mb: 6, color: 'text.secondary', fontWeight: 400 }}>
        Everything you need to succeed in hiring top talent
      </Typography>

      <Grid container spacing={4}>
        {resources.map((resource, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card sx={{ height: '100%', borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)', transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-4px)' } }}>
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <Box sx={{ mb: 3 }}>
                  {resource.icon}
                </Box>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
                  {resource.title}
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                  {resource.description}
                </Typography>
                <Button variant="outlined" sx={{ borderColor: '#ff6b35', color: '#ff6b35', '&:hover': { borderColor: '#e55a2b', bgcolor: 'rgba(255, 107, 53, 0.04)' } }}>
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}