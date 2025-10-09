import React from 'react'
import { Box, Typography, Paper } from '@mui/material'

export default function PrivacyPolicy() {
  return (
    <Box sx={{ py: 8, px: 3, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h2" sx={{ textAlign: 'center', mb: 4, fontWeight: 800, background: 'linear-gradient(135deg, #ff6b35 0%, #f72585 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Privacy Policy
      </Typography>

      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
          1. Information We Collect
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary', lineHeight: 1.7 }}>
          We collect information you provide directly to us, such as when you create an account, apply for jobs, or contact us for support. This includes your name, email address, resume, and other information you choose to provide.
        </Typography>

        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
          2. How We Use Your Information
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary', lineHeight: 1.7 }}>
          We use the information we collect to provide, maintain, and improve our services, process job applications, communicate with you, and comply with legal obligations.
        </Typography>

        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
          3. Information Sharing
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary', lineHeight: 1.7 }}>
          We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy or as required by law.
        </Typography>

        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
          4. Data Security
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary', lineHeight: 1.7 }}>
          We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
        </Typography>

        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
          5. Your Rights
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary', lineHeight: 1.7 }}>
          You have the right to access, update, or delete your personal information. You may also opt out of certain communications.
        </Typography>

        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
          6. Contact Us
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary', lineHeight: 1.7 }}>
          If you have any questions about this Privacy Policy, please contact us at privacy@jobportal.com.
        </Typography>

        <Typography variant="body2" sx={{ mt: 4, color: 'text.secondary', fontStyle: 'italic' }}>
          Last updated: January 2024
        </Typography>
      </Paper>
    </Box>
  )
}