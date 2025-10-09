import React from 'react'
import { Box, Typography, Grid, Card, CardContent, CardMedia, Button, Chip } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'

export default function Blog() {
  const blogPosts = [
    {
      title: 'The Future of Remote Work: Trends for 2024',
      excerpt: 'Explore the latest trends shaping the remote work landscape and what it means for job seekers and employers.',
      author: 'Sarah Johnson',
      date: 'January 20, 2024',
      category: 'Remote Work',
      image: 'https://via.placeholder.com/400x250/FF6B35/FFFFFF?text=Remote+Work',
      readTime: '5 min read'
    },
    {
      title: 'How to Write a Standout Resume in 2024',
      excerpt: 'Learn the latest resume writing techniques that will help you land your dream job.',
      author: 'Mike Chen',
      date: 'January 18, 2024',
      category: 'Career Advice',
      image: 'https://via.placeholder.com/400x250/F72585/FFFFFF?text=Resume+Tips',
      readTime: '7 min read'
    },
    {
      title: 'Top Skills Employers Are Looking For',
      excerpt: 'Discover the most in-demand skills across various industries and how to develop them.',
      author: 'Emily Davis',
      date: 'January 15, 2024',
      category: 'Skills',
      image: 'https://via.placeholder.com/400x250/7209B7/FFFFFF?text=Skills',
      readTime: '6 min read'
    },
    {
      title: 'Interview Preparation: Common Questions and Answers',
      excerpt: 'Master the art of interviewing with tips on handling the most frequently asked questions.',
      author: 'David Wilson',
      date: 'January 12, 2024',
      category: 'Interview Tips',
      image: 'https://via.placeholder.com/400x250/560BAD/FFFFFF?text=Interview',
      readTime: '8 min read'
    },
    {
      title: 'Building a Personal Brand on LinkedIn',
      excerpt: 'Strategies for creating a compelling professional presence on the world\'s largest networking platform.',
      author: 'Lisa Rodriguez',
      date: 'January 10, 2024',
      category: 'Personal Branding',
      image: 'https://via.placeholder.com/400x250/F77F00/FFFFFF?text=LinkedIn',
      readTime: '4 min read'
    },
    {
      title: 'Salary Negotiation: What You Need to Know',
      excerpt: 'Essential tips for negotiating your salary and benefits package effectively.',
      author: 'Tom Anderson',
      date: 'January 8, 2024',
      category: 'Career Advice',
      image: 'https://via.placeholder.com/400x250/DC2F02/FFFFFF?text=Salary',
      readTime: '6 min read'
    }
  ]

  const categories = ['All', 'Career Advice', 'Remote Work', 'Skills', 'Interview Tips', 'Personal Branding']

  return (
    <Box sx={{ py: 8, px: 3, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h2" sx={{ textAlign: 'center', mb: 4, fontWeight: 800, background: 'linear-gradient(135deg, #ff6b35 0%, #f72585 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        JobPortal Blog
      </Typography>
      <Typography variant="h5" sx={{ textAlign: 'center', mb: 6, color: 'text.secondary', fontWeight: 400 }}>
        Insights, tips, and advice for your career journey
      </Typography>

      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 1 }}>
        {categories.map((category) => (
          <Chip
            key={category}
            label={category}
            clickable
            sx={{
              backgroundColor: category === 'All' ? '#ff6b35' : 'transparent',
              color: category === 'All' ? 'white' : '#ff6b35',
              border: '1px solid #ff6b35',
              '&:hover': {
                backgroundColor: category === 'All' ? '#e55a2b' : 'rgba(255, 107, 53, 0.04)'
              }
            }}
          />
        ))}
      </Box>

      <Grid container spacing={4}>
        {blogPosts.map((post, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <Card sx={{ height: '100%', borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)', transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-4px)' } }}>
              <CardMedia
                component="img"
                height="200"
                image={post.image}
                alt={post.title}
                sx={{ borderRadius: '12px 12px 0 0' }}
              />
              <CardContent sx={{ p: 3 }}>
                <Chip
                  label={post.category}
                  size="small"
                  sx={{ mb: 2, backgroundColor: 'rgba(255, 107, 53, 0.1)', color: '#ff6b35' }}
                />
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, lineHeight: 1.3 }}>
                  {post.title}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary', lineHeight: 1.5 }}>
                  {post.excerpt}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <PersonIcon sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {post.author}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarTodayIcon sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {post.date}
                    </Typography>
                  </Box>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {post.readTime}
                  </Typography>
                </Box>
                <Button
                  variant="text"
                  sx={{
                    mt: 2,
                    color: '#ff6b35',
                    p: 0,
                    '&:hover': { bgcolor: 'rgba(255, 107, 53, 0.04)' }
                  }}
                >
                  Read More →
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}