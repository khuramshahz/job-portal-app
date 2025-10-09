import React from 'react'
import { Box, Typography, Paper } from '@mui/material'

export default function TermsOfService() {
  return (
    <Box sx={{ py: 8, px: 3, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h2" sx={{ textAlign: 'center', mb: 4, fontWeight: 800, background: 'linear-gradient(135deg, #ff6b35 0%, #f72585 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Terms of Service
      </Typography>

      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
          1. Acceptance of Terms
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary', lineHeight: 1.7 }}>
          By accessing and using our job portal, you accept and agree to be bound by the terms and provision of this agreement.
        </Typography>

        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
          2. Use License
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary', lineHeight: 1.7 }}>
          Permission is granted to temporarily access the materials on our website for personal, non-commercial transitory viewing only.
        </Typography>

        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
          3. User Responsibilities
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary', lineHeight: 1.7 }}>
          Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account.
        </Typography>

        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
          4. Prohibited Uses
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary', lineHeight: 1.7 }}>
          You may not use our services for any unlawful purpose or to solicit others to perform unlawful acts.
        </Typography>

        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
          5. Content
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary', lineHeight: 1.7 }}>
          Our service allows you to post, link, store, share and otherwise make available certain information, text, graphics, or other material.
        </Typography>

        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
          6. Termination
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary', lineHeight: 1.7 }}>
          We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever.
        </Typography>

        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
          7. Contact Information
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary', lineHeight: 1.7 }}>
          If you have any questions about these Terms of Service, please contact us at legal@jobportal.com.
        </Typography>

        <Typography variant="body2" sx={{ mt: 4, color: 'text.secondary', fontStyle: 'italic' }}>
          Last updated: January 2024
        </Typography>
      </Paper>
    </Box>
  )
}