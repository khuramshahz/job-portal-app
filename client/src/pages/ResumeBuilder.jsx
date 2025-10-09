import React from 'react'
import { Box, Typography, Grid, Card, CardContent, Button, TextField } from '@mui/material'
import DescriptionIcon from '@mui/icons-material/Description'
import EditIcon from '@mui/icons-material/Edit'
import DownloadIcon from '@mui/icons-material/Download'

export default function ResumeBuilder() {
  return (
    <Box sx={{ py: 8, px: 3, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h2" sx={{ textAlign: 'center', mb: 4, fontWeight: 800, background: 'linear-gradient(135deg, #ff6b35 0%, #f72585 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Resume Builder
      </Typography>
      <Typography variant="h5" sx={{ textAlign: 'center', mb: 6, color: 'text.secondary', fontWeight: 400 }}>
        Create a professional resume in minutes with our easy-to-use builder
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Start Building Your Resume
              </Typography>
              <TextField fullWidth label="Full Name" sx={{ mb: 2 }} />
              <TextField fullWidth label="Email" type="email" sx={{ mb: 2 }} />
              <TextField fullWidth label="Phone" sx={{ mb: 3 }} />
              <Button variant="contained" fullWidth sx={{ py: 1.5, background: 'linear-gradient(135deg, #ff6b35 0%, #f72585 100%)', '&:hover': { background: 'linear-gradient(135deg, #e55a2b 0%, #d61f73 100%)' } }}>
                Create Resume
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)', height: '100%' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <DescriptionIcon sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                Professional Templates
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
                Choose from multiple professionally designed templates to make your resume stand out.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                <Button variant="outlined" startIcon={<EditIcon />}>
                  Customize
                </Button>
                <Button variant="contained" startIcon={<DownloadIcon />} sx={{ background: 'linear-gradient(135deg, #ff6b35 0%, #f72585 100%)', '&:hover': { background: 'linear-gradient(135deg, #e55a2b 0%, #d61f73 100%)' } }}>
                  Download
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}