import React from 'react'
import { Box, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material'
import ArticleIcon from '@mui/icons-material/Article'

export default function Press() {
  const pressReleases = [
    {
      title: 'JobPortal Launches AI-Powered Job Matching',
      date: 'January 15, 2024',
      summary: 'New AI technology helps connect job seekers with their dream roles faster than ever before.',
      link: '#'
    },
    {
      title: 'Record Growth: 1 Million Jobs Posted in Q4',
      date: 'December 20, 2023',
      summary: 'JobPortal sees unprecedented growth as companies return to hiring following economic recovery.',
      link: '#'
    },
    {
      title: 'Partnership with Leading Universities Announced',
      date: 'November 10, 2023',
      summary: 'New program connects students with top employers through exclusive career fairs and workshops.',
      link: '#'
    },
    {
      title: 'Mobile App Redesign Wins Design Award',
      date: 'October 5, 2023',
      summary: 'JobPortal\'s mobile app recognized for outstanding user experience and innovative design.',
      link: '#'
    }
  ]

  const mediaKit = [
    { name: 'Company Logo (PNG)', type: 'Logo' },
    { name: 'Company Logo (SVG)', type: 'Logo' },
    { name: 'Brand Guidelines', type: 'Guidelines' },
    { name: 'High-Resolution Images', type: 'Images' },
    { name: 'Press Kit (PDF)', type: 'Kit' }
  ]

  return (
    <Box sx={{ py: 8, px: 3, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h2" sx={{ textAlign: 'center', mb: 4, fontWeight: 800, background: 'linear-gradient(135deg, #ff6b35 0%, #f72585 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Press Center
      </Typography>
      <Typography variant="h5" sx={{ textAlign: 'center', mb: 6, color: 'text.secondary', fontWeight: 400 }}>
        Latest news, press releases, and media resources
      </Typography>

      <Grid container spacing={6}>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
            Press Releases
          </Typography>
          {pressReleases.map((release, index) => (
            <Card key={index} sx={{ mb: 3, borderRadius: 3, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>
                  {release.title}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                  {release.date}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
                  {release.summary}
                </Typography>
                <Button variant="text" sx={{ color: '#ff6b35', p: 0, '&:hover': { bgcolor: 'rgba(255, 107, 53, 0.04)' } }}>
                  Read More →
                </Button>
              </CardContent>
            </Card>
          ))}
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)', mb: 3 }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
                Media Kit
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                Download our official logos, brand guidelines, and press materials.
              </Typography>
              {mediaKit.map((item, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <ArticleIcon sx={{ mr: 2, color: '#ff6b35' }} />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {item.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {item.type}
                    </Typography>
                  </Box>
                </Box>
              ))}
              <Button variant="contained" fullWidth sx={{ mt: 2, background: 'linear-gradient(135deg, #ff6b35 0%, #f72585 100%)', '&:hover': { background: 'linear-gradient(135deg, #e55a2b 0%, #d61f73 100%)' } }}>
                Download Media Kit
              </Button>
            </CardContent>
          </Card>

          <Card sx={{ p: 3, borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
                Press Inquiries
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                For press inquiries, please contact our media team.
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Email:</strong> press@jobportal.com
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                <strong>Phone:</strong> (555) 123-4567
              </Typography>
              <Button variant="outlined" fullWidth sx={{ borderColor: '#ff6b35', color: '#ff6b35', '&:hover': { borderColor: '#e55a2b', bgcolor: 'rgba(255, 107, 53, 0.04)' } }}>
                Contact Press Team
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}